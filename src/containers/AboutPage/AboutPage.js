import React from 'react';
import { LayoutSingleColumn, Page, NamedLink } from '../../components';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';
import { useConfiguration } from '../../context/configurationContext';

import css from './AboutPage.module.css';

// Import images
import heroImage from './about_us_hero_1776426355677.png';
import itemsImage from './about_sharing_items_1776426555231.png';

const AboutPage = () => {
  const config = useConfiguration();
  const { marketplaceName } = config;

  return (
    <Page
      title={`About Us | ${marketplaceName}`}
      scrollingDisabled={false}
      description="Lends is a peer-to-peer rental marketplace connecting people who own unique assets with those who need them."
    >
      <LayoutSingleColumn
        className={css.pageRoot}
        topbar={<TopbarContainer />}
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          
          {/* Hero Section */}
          <section className={css.heroSection}>
            <div className={css.heroContent}>
              <h1 className={css.heroTitle}>Lends is a peer-to-peer rental marketplace.</h1>
              <p className={css.heroSubtitle}>
                It connects people who own unique assets and provide services with people who need them for a short period of time.
              </p>
              <div className={css.heroBadges}>
                <span className={css.badge}>Local</span>
                <span className={css.badge}>Direct</span>
                <span className={css.badge}>Flexible</span>
              </div>
            </div>
            <div className={css.heroImageContainer}>
              <img src={heroImage} alt="About Lends Hero" className={css.heroImage} />
            </div>
          </section>

          {/* Value Prop Section */}
          <section className={css.valueSection}>
            <div className={css.valueCard}>
              <h2>You keep what you own.</h2>
              <p>Maintain full control over your assets while they work for you.</p>
            </div>
            <div className={css.valueCard}>
              <h2>You set your rates.</h2>
              <p>Price your items and services based on your value and market demand.</p>
            </div>
            <div className={css.valueCard}>
              <h2>You decide availability.</h2>
              <p>Toggle availability to fit your schedule and lifestyle.</p>
            </div>
          </section>

          {/* The Gap Section */}
          <section className={css.textSection}>
            <div className={css.sectionContainer}>
              <div className={css.textContent}>
                <h2 className={css.sectionHeading}>Why It Exists</h2>
                <p className={css.largeText}>
                  There’s a gap between ownership and temporary need.
                </p>
                <p>
                  People often need something specific — for an event, a project, a move, or a moment — but not permanently. 
                  At the same time, many of those things already exist within local communities.
                </p>
                <p className={css.highlightText}>
                  Lends exists to make that connection simple.
                </p>
              </div>
            </div>
          </section>

          {/* Mission Section (Split Layout) */}
          <section className={css.splitSection}>
            <div className={css.splitImageContainer}>
              <img src={itemsImage} alt="Unique Items" className={css.splitImage} />
            </div>
            <div className={css.splitContent}>
              <span className={css.overline}>Our Mission</span>
              <h2 className={css.splitTitle}>Access Over Ownership</h2>
              <p>
                We believe access is often better than ownership. You shouldn’t have to buy something you’ll use once, 
                store it forever, and eventually throw it away.
              </p>
              <p>
                LENDS makes it easy to access unique items and services from people nearby — 
                without buying, storing, or relying on disposable alternatives.
              </p>
            </div>
          </section>

          {/* Big Quote / Statement Section */}
          <section className={css.quoteSection}>
            <div className={css.quoteContainer}>
              <blockquote className={css.mainQuote}>
                "LENDS was created around a simple idea: a lot of great things already exist — they’re just sitting in storage."
              </blockquote>
            </div>
          </section>

          {/* Detailed Info Grid */}
          <section className={css.gridSection}>
            <div className={css.gridItem}>
              <h3>Turning Storage Into Value</h3>
              <p>
                If you’re paying to store props, gear, costumes, sets, or specialty items, those things can help pay for their own existence. 
                List items you already own and generate income on your terms.
              </p>
            </div>
            <div className={css.gridItem}>
              <h3>Supporting Creatives</h3>
              <p>
                LENDS is designed to support creatives, performers, builders, producers, designers, and collectors. 
                Whether it's a side income or offsetting storage costs, it's a smarter way to use resources you've already invested in.
              </p>
            </div>
            <div className={css.gridItem}>
              <h3>Items and Services, Together</h3>
              <p>
                Some listings are simple rentals. Others include delivery, setup, or operation. 
                We believe the best experiences happen when people know exactly what they’re booking.
              </p>
            </div>
            <div className={css.gridItem}>
              <h3>Looking Forward</h3>
              <p>
                Our goal is to build a platform where good things don’t disappear into storage. 
                Reuse what exists. Earn from what you own. Reduce waste.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className={css.ctaSection}>
            <div className={css.ctaContainer}>
              <h2>Ready to join the community?</h2>
              <div className={css.ctaButtons}>
                <NamedLink name="SignupPage" className={css.primaryCta}>Join Lends Today</NamedLink>
                <NamedLink name="SearchPage" className={css.secondaryCta}>Explore Listings</NamedLink>
              </div>
            </div>
          </section>

        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default AboutPage;


