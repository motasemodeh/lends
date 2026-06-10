import React from 'react';
import { useIntl } from '../../util/reactIntl';
import { ListingCardRental } from '../../components';

import css from './SectionRecommendsMaybe.module.css';

/**
 * SectionRecommendsMaybe
 *
 * Renders a "This provider also recommends" section on the listing page,
 * showing up to 5 recommended listings using the standard ListingCardRental component.
 * Returns null if no recommended listings are provided.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.listings - Array of listing entities from marketplaceData
 * @param {Object} props.listingImageConfig - Image config for the cards
 * @returns {JSX.Element|null}
 */
const SectionRecommendsMaybe = props => {
  const { listings = [], listingImageConfig } = props;
  const intl = useIntl();

  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <section className={css.root}>
      <h2 className={css.title}>
        {intl.formatMessage({ id: 'ListingPage.recommendsTitle' })}
      </h2>
      <div className={css.listingsGrid}>
        {listings.map(listing => (
          <ListingCardRental
            key={listing.id?.uuid}
            listing={listing}
            listingImageConfig={listingImageConfig}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionRecommendsMaybe;
