import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useConfiguration } from '../../context/configurationContext';
import { FormattedMessage } from '../../util/reactIntl';
import ListingCardRental from '../ListingCardRental/ListingCardRental';
import NamedLink from '../NamedLink/NamedLink';

import css from './SectionFeaturedListings.module.css';

const SectionFeaturedListings = props => {
  const config = useConfiguration();
  const {
    sectionId = 'featured-listings',
    title = 'Browse the world\'s most trusted rental marketplace!',
    subtitle = 'Fast, affordable, and flexible',
    listings = [],
    options,
    allSections = [],
  } = props;
  const carouselRef = useRef(null);

  const scroll = direction => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const {
    onFetchFeaturedListings,
    featuredListingData,
    getListingEntitiesById,
    parentPage,
  } = options?.featuredListings || {};

  const listingIds = featuredListingData?.[sectionId]?.listingIds;
  const listingEntities = listingIds ? getListingEntitiesById(listingIds) : listings;
  const fetched = featuredListingData?.[sectionId]?.fetched || false;
  const inProgress = featuredListingData?.[sectionId]?.inProgress;
  const error = featuredListingData?.[sectionId]?.error;

  const listingImageConfig = config.layout.listingImage;

  useEffect(() => {
    if (!fetched && inProgress !== true && !error && onFetchFeaturedListings) {
      // Pass allSections so the duck can find the listingSelection for this section
      // We also ensure there's a fallback listingSelection if it's missing in allSections
      const sectionsForFetch = allSections.length > 0 
        ? allSections 
        : [{ sectionId, sectionType: 'listings', listingSelection: 'newest' }];
        
      onFetchFeaturedListings(sectionId, parentPage, listingImageConfig, sectionsForFetch);
    }
  }, [fetched, inProgress, error, onFetchFeaturedListings, sectionId, listingImageConfig, parentPage, allSections]);

  if (inProgress && listingEntities.length === 0) {
    return null; // Or a loader
  }

  return (
    <div className={css.sectionContainer}>
      <div className={css.constraints}>
        <div className={css.header}>
          <h1 className={css.title}>{title}</h1>
          {subtitle && <p className={css.subtitle}>{subtitle}</p>}
        </div>
        <div className={css.carouselWrapper}>
          <button className={classNames(css.scrollButton, css.prevButton)} onClick={() => scroll('left')} aria-label="Previous">
            ‹
          </button>
          <div className={css.carousel} ref={carouselRef}>
            {listingEntities.map(listing => (
              <div key={listing.id.uuid} className={css.listingItem}>
                <ListingCardRental
                  listing={listing}
                  renderSizes="(max-width: 767px) 80vw, (max-width: 1023px) 40vw, 300px"
                />
              </div>
            ))}
          </div>
          <button className={classNames(css.scrollButton, css.nextButton)} onClick={() => scroll('right')} aria-label="Next">
            ›
          </button>
        </div>
        
        <div className={css.footer}>
          <NamedLink name="SearchPage" className={css.seeMoreButton}>
            See More Listings ➔
          </NamedLink>
        </div>
      </div>
    </div>
  );
};

export default SectionFeaturedListings;
