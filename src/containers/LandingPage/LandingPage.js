import React from 'react';
import loadable from '@loadable/component';

import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { camelize } from '../../util/string';
import { propTypes } from '../../util/types';

import FallbackPage from './FallbackPage';
import { ASSET_NAME } from './LandingPage.duck';
import { fetchFeaturedListings } from '../../ducks/featuredListings.duck';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { getFeaturedListingsProps } from '../../util/data';

import { SectionFeaturedListings, LendsHero } from '../../components';
import SectionWhyChoose from '../../components/SectionWhyChoose/SectionWhyChoose';
import SectionHowItWorks from '../../components/SectionHowItWorks/SectionHowItWorks';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

export const LandingPageComponent = props => {
  const { pageAssetsData, inProgress, error, featuredListingData, getListingEntitiesById, onFetchFeaturedListings } = props;

  const assetData = pageAssetsData?.[camelize(ASSET_NAME)]?.data;
  const sections = assetData?.sections || [];
  const heroIndex = sections.findIndex(s => s.sectionId === 'hero' || s.sectionType === 'hero');

  // Inject custom professional sections
  const updatedSections = [...sections];
  
  // 1. Featured Listings Section
  const featuredSection = {
    sectionId: 'featured-listings',
    sectionType: 'featured-listings',
    title: 'Latest Listings',
    subtitle: 'PREMIUM SELECTIONS',
    listingSelection: 'newest',
  };

  // 2. Why Choose LENDS Section
  const whyChooseSection = {
    sectionId: 'why-choose-lends',
    sectionType: 'why-choose-lends',
  };

  // 3. How LENDS Works Section
  const howItWorksSection = {
    sectionId: 'how-lends-works',
    sectionType: 'how-lends-works',
  };

  if (heroIndex !== -1) {
    updatedSections.splice(heroIndex + 1, 0, featuredSection, whyChooseSection, howItWorksSection);
  } else if (sections.length > 0) {
    updatedSections.unshift(featuredSection, whyChooseSection, howItWorksSection);
  }

  const updatedPageAssetsData = assetData ? { ...assetData, sections: updatedSections } : null;

  return (
    <PageBuilder
      pageAssetsData={updatedPageAssetsData}
      inProgress={inProgress}
      error={error}
      fallbackPage={<FallbackPage error={error} />}
      featuredListings={getFeaturedListingsProps(camelize(ASSET_NAME), props)}
      options={{
        sectionComponents: {
          'hero': { component: LendsHero },
          'featured-listings': { component: SectionFeaturedListings },
          'why-choose-lends': { component: SectionWhyChoose },
          'how-lends-works': { component: SectionHowItWorks },
        },
      }}
    />
  );
};

LandingPageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress, error } = state.hostedAssets || {};
  const featuredListingData = state.featuredListings || {};

  const getListingEntitiesById = listingIds => getListingsById(state, listingIds);

  return { pageAssetsData, featuredListingData, getListingEntitiesById, inProgress, error };
};

const mapDispatchToProps = dispatch => ({
  onFetchFeaturedListings: (sectionId, parentPage, listingImageConfig, allSections) =>
    dispatch(fetchFeaturedListings({ sectionId, parentPage, listingImageConfig, allSections })),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPageComponent);

export default LandingPage;
