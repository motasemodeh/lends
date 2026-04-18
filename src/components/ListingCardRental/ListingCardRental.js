import React, { useRef } from 'react';
import classNames from 'classnames';
import { useConfiguration } from '../../context/configurationContext';
import { useIntl } from '../../util/reactIntl';
import { createSlug } from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import AspectRatioWrapper from '../AspectRatioWrapper/AspectRatioWrapper';
import NamedLink from '../NamedLink/NamedLink';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import IconLocation from '../IconLocation/IconLocation';
import IconReviewStar from '../IconReviewStar/IconReviewStar';
import Avatar from '../Avatar/Avatar';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './ListingCardRental.module.css';

const { Money } = sdkTypes;

const ListingCardRental = props => {
  const config = useConfiguration();
  const intl = useIntl();
  const { className, rootClassName, listing, renderSizes } = props;

  const classes = classNames(rootClassName || css.root, className);
  const tagsRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const onMouseDown = (e) => {
    isDown = true;
    e.currentTarget.classList.add(css.tagsActive);
    startX = e.pageX - e.currentTarget.offsetLeft;
    scrollLeft = e.currentTarget.scrollLeft;
  };
  const onMouseLeave = (e) => {
    isDown = false;
    e.currentTarget.classList.remove(css.tagsActive);
  };
  const onMouseUp = (e) => {
    isDown = false;
    e.currentTarget.classList.remove(css.tagsActive);
  };
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const author = listing.author;
  const authorDisplayName = author?.attributes?.profile?.displayName || 'Unknown Provider';
  const { title = '', price, publicData } = listing.attributes || {};
  const { location, address, deliveryMethod } = publicData || {};
  const showPickup = deliveryMethod === 'pickup' || deliveryMethod === 'both';
  const showDelivery = deliveryMethod === 'delivery' || deliveryMethod === 'both';
  const stringifyLocation = loc => (typeof loc === 'object' ? loc.address || loc.building || '' : loc);
  const locationLabel = stringifyLocation(location) || (typeof address === 'string' ? address.split(',').slice(-2, -1)[0]?.trim() : stringifyLocation(address));
  const id = listing.id.uuid;
  const slug = createSlug(title);

  const firstImage = listing.images?.[0];
  const variantPrefix = 'listing-card';
  const variants = firstImage
    ? Object.keys(firstImage.attributes.variants).filter(k => k.startsWith(variantPrefix))
    : [];

  const formattedPrice = price instanceof Money ? formatMoney(intl, price) : '';

  const price7Days =
    price instanceof Money
      ? formatMoney(intl, new Money(Math.round(price.amount * 0.8 * 7), price.currency))
      : '';
  const price2Days =
    price instanceof Money
      ? formatMoney(intl, new Money(Math.round(price.amount * 1.5), price.currency))
      : '';

  return (
    <div className={classes}>
      <div className={css.imageWrapper}>
        <AspectRatioWrapper width={1.2} height={1}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={variants}
            sizes={renderSizes}
          />
        </AspectRatioWrapper>
        {locationLabel && (
          <div className={css.distanceBadge}>
            <IconLocation className={css.locationIcon} />
            <span>{locationLabel}</span>
          </div>
        )}
      </div>

      <div className={css.info}>
        <div
          className={css.tags}
          ref={tagsRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {showPickup && locationLabel && (
            <span className={css.tag}>
              <IconLocation className={css.tagIcon} />
              Pickup in {locationLabel}
            </span>
          )}
          {showDelivery && (
            <span className={css.tag}>
              Delivery Available
            </span>
          )}
        </div>

        <NamedLink name="ListingPage" params={{ id, slug }} className={css.titleLink}>
          <h3 className={css.title}>{title}</h3>
        </NamedLink>

        <div className={css.priceGrid}>
          <div className={classNames(css.priceBox, css.priceBoxHighlighted)}>
            <div className={css.priceValue}>{price2Days}</div>
            <div className={css.priceLabel}>2 days</div>
          </div>
          <div className={css.priceBox}>
            <div className={css.priceValue}>{formattedPrice}</div>
            <div className={css.priceLabel}>Per day</div>
          </div>
          <div className={css.priceBox}>
            <div className={css.priceValue}>{price7Days}</div>
            <div className={css.priceLabel}>7 days</div>
          </div>
        </div>
      </div>

      <div className={css.footer}>
        <div className={css.authorInfo}>
          <div className={css.avatarWrapper}>
            <Avatar user={author} disableProfileLink className={css.squareAvatar} />
          </div>
          <span className={css.authorName}>{authorDisplayName}</span>
        </div>
      </div>

    </div>
  );
};

export default ListingCardRental;
