import React, { useEffect, useRef, useState } from 'react';
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
  const [activeSlide, setActiveSlide] = useState(0);

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
      const sectionsForFetch = allSections.length > 0 
        ? allSections 
        : [{ sectionId, sectionType: 'listings', listingSelection: 'newest' }];
        
      onFetchFeaturedListings(sectionId, parentPage, listingImageConfig, sectionsForFetch);
    }
  }, [fetched, inProgress, error, onFetchFeaturedListings, sectionId, listingImageConfig, parentPage, allSections]);

  const scroll = direction => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeSlide) {
        setActiveSlide(index);
      }
    }
  };

  const scrollToSlide = index => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      carouselRef.current.scrollTo({ left: index * clientWidth, behavior: 'smooth' });
      setActiveSlide(index);
    }
  };

  if (inProgress && listingEntities.length === 0) {
    return null;
  }

  return (
    <div className={css.sectionContainer} data-debug="my-featured-listings">
      <div className={css.constraints}>
        <div className={css.header}>
          <h1 className={css.title}>{title}</h1>
          {subtitle && <p className={css.subtitle}>{subtitle}</p>}
        </div>
        <div className={css.carouselWrapper}>
          <button 
            className={classNames(css.scrollButton, css.prevButton, { [css.hidden]: activeSlide === 0 })} 
            onClick={() => scroll('left')} 
            aria-label="Previous"
          >
            ‹
          </button>
          
          <div className={css.carousel} ref={carouselRef} onScroll={handleScroll}>
            {listingEntities.map((listing, index) => (
              <div key={listing.id.uuid} className={css.listingItem}>
                <ListingCardRental
                  listing={listing}
                  renderSizes="(max-width: 767px) 100vw, (max-width: 1023px) 40vw, 300px"
                />
              </div>
            ))}
          </div>
          
          <button 
            className={classNames(css.scrollButton, css.nextButton, { [css.hidden]: activeSlide === listingEntities.length - 1 })} 
            onClick={() => scroll('right')} 
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {listingEntities.length > 1 && (
          <div className={css.dots}>
            {listingEntities.map((_, index) => (
              <button
                key={index}
                className={classNames(css.dot, { [css.activeDot]: activeSlide === index })}
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
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
