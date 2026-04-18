import React from 'react';
import NamedLink from '../NamedLink/NamedLink';

import css from './SectionWhyChoose.module.css';

/**
 * SectionWhyChoose - Premium "Why Choose LENDS?" section for the landing page.
 * Displays value propositions for both Customers and Providers.
 *
 * @component
 * @returns {JSX.Element}
 */
const SectionWhyChoose = () => {
  return (
    <div className={css.root}>
      <div className={css.container}>
        <h2 className={css.sectionTitle}>Why Choose <span className={css.brand}>LENDS</span>?</h2>

        <div className={css.grid}>
          {/* For Customers Card */}
          <div className={css.card}>
            <div className={css.cardIconWrapper}>
              <svg className={css.cardIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={css.cardTitle}>For Customers</h3>
            <p className={css.cardText}>
              Access distinctive, one-of-a-kind items and services from local creatives—without
              buying, storing, or wasting money on things you'll only use once. Better quality,
              more character, less waste.
            </p>
            <NamedLink name="SearchPage" className={css.cardButton}>
              Browse Items
              <svg className={css.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </NamedLink>
          </div>

          {/* For Providers Card */}
          <div className={css.card}>
            <div className={css.cardIconWrapper + ' ' + css.cardIconProvider}>
              <svg className={css.cardIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={css.cardTitle}>For Providers</h3>
            <p className={css.cardText}>
              Have your storage pay for itself. You already own cool, unique things—props, gear,
              sets, costumes, equipment. LENDS lets you rent them to people nearby when you're not
              using them, turning idle items into passive income without giving them up.
            </p>
            <NamedLink name="NewListingPage" className={css.cardButtonProvider}>
              List Your Items
              <svg className={css.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </NamedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWhyChoose;
