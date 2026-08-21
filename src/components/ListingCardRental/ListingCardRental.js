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
  const getCityState = loc => {
    let addressStr = typeof loc === 'object' ? loc?.address : loc;
    if (typeof addressStr !== 'string' || !addressStr) return '';
    
    const parts = addressStr.split(',').map(s => s.trim());
    if (parts.length >= 4) {
      // "Street, City, State Zip, Country" -> "City, State"
      let state = parts[parts.length - 2].replace(/\s\d{4,}.*$/, '').trim();
      return `${parts[parts.length - 3]}, ${state}`;
    } else if (parts.length === 3) {
      // "City, State Zip, Country" -> "City, State"
      let state = parts[1].replace(/\s\d{4,}.*$/, '').trim();
      return `${parts[0]}, ${state}`;
    }
    return addressStr;
  };
  
  const getDurationText = (duration) => {
    const durInt = parseInt(duration, 10);
    if (isNaN(durInt) || durInt <= 1) {
      return intl.formatMessage({ id: 'ListingCardRental.perDay' });
    }
    return intl.formatMessage({ id: 'ListingCardRental.forNDays' }, { count: durInt });
  };

  const shortestVariant =
    publicData?.priceVariants?.length > 0
      ? publicData.priceVariants.reduce((shortest, curr) => {
          const currDur =
            curr.minimumRentalDuration != null ? parseInt(curr.minimumRentalDuration, 10) : 1;
          const shortestDur =
            shortest.minimumRentalDuration != null ? parseInt(shortest.minimumRentalDuration, 10) : 1;
          if (currDur < shortestDur) return curr;
          if (currDur === shortestDur) {
            const currAmt = curr.priceInSubunits ?? curr.price?.amount ?? curr.price ?? Infinity;
            const shortestAmt =
              shortest.priceInSubunits ?? shortest.price?.amount ?? shortest.price ?? Infinity;
            return currAmt < shortestAmt ? curr : shortest;
          }
          return shortest;
        }, publicData.priceVariants[0])
      : null;

  const activeMinDuration =
    shortestVariant?.minimumRentalDuration != null
      ? shortestVariant.minimumRentalDuration
      : publicData?.minimumRentalDuration || 1;

  const locationLabel = getCityState(location || address);
  const durationLabel = getDurationText(activeMinDuration);
  const id = listing.id.uuid;
  const slug = createSlug(title);

  const firstImage = listing.images?.[0];
  const variantPrefix = 'listing-card';
  const variants = firstImage
    ? Object.keys(firstImage.attributes.variants).filter(k => k.startsWith(variantPrefix))
    : [];

  const displayPrice =
    shortestVariant?.priceInSubunits != null
      ? new Money(shortestVariant.priceInSubunits, config.currency)
      : price;

  const formattedPrice = displayPrice instanceof Money ? formatMoney(intl, displayPrice) : '';

  return (
    <div className={classes}>
      <NamedLink name="ListingPage" params={{ id, slug }} className={css.imageWrapper}>
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
      </NamedLink>

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
            <div className={css.priceValue}>{formattedPrice}</div>
            <div className={css.priceLabel}>{durationLabel}</div>
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
