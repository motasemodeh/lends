import React from 'react';
import { LayoutSingleColumn, Page, NamedLink } from '../../components';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';
import { useConfiguration } from '../../context/configurationContext';

import css from './BuildStorePage.module.css';

const BuildStorePage = () => {
  const config = useConfiguration();
  const { marketplaceName } = config;

  return (
    <Page
      title={`Build Your Store | ${marketplaceName}`}
      scrollingDisabled={false}
      description="Start your professional rental business on Lends. Manage inventory, secure payments, and grow your community store."
    >
      <LayoutSingleColumn
        className={css.pageRoot}
        topbar={<TopbarContainer />}
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          
          {/* Hero Section */}
          <header className={css.heroSection}>
            <div className={css.heroContent}>
              <span className={css.heroOverline}>Partner with Lends</span>
              <h1 className={css.heroTitle}>Build Your Rental Business.</h1>
              <p className={css.heroSubtitle}>
                From specialty gear to creative assets — turn what you own into a professional storefront. 
                Everything you need to manage, scale, and succeed.
              </p>
              <div className={css.heroCta}>
                <NamedLink name="SignupPage" className={css.primaryButton}>Start Your Store</NamedLink>
                <NamedLink name="LandingPage" className={css.secondaryButton}>Learn More</NamedLink>
              </div>
            </div>
          </header>

          {/* Three Pillars Section */}
          <section className={css.pillarSection}>
            <div className={css.pillarGrid}>
              <div className={css.pillarCard}>
                <div className={css.pillarIcon}>📋</div>
                <h3>Inventory Management</h3>
                <p>Easy-to-use tools to list single items or large collections. Control pricing, availability, and rental terms with a few clicks.</p>
              </div>
              <div className={css.pillarCard}>
                <div className={css.pillarIcon}>🔒</div>
                <h3>Secure Transactions</h3>
                <p>Professional payment processing with built-in security deposits and insurance options to protect your valuable assets.</p>
              </div>
              <div className={css.pillarCard}>
                <div className={css.pillarIcon}>🚚</div>
                <h3>Logistics Support</h3>
                <p>Set up custom delivery zones, pickup points, and delivery fees. Manage fulfillment on your own terms.</p>
              </div>
            </div>
          </section>

          {/* Why Lends (Detailed) */}
          <section className={css.whySection}>
            <div className={css.sectionHeader}>
              <h2 className={css.sectionTitle}>Why Professional Hosts Choose Lends</h2>
              <p className={css.sectionSubtitle}>We've built the infrastructure so you can focus on your inventory.</p>
            </div>
            
            <div className={css.whyGrid}>
              <div className={css.whyItem}>
                <h4>Direct Communication</h4>
                <p>Talk directly with renters. Build relationships and ensure your items are in good hands before the rental begins.</p>
              </div>
              <div className={css.whyItem}>
                <h4>Flexible Pricing</h4>
                <p>Set daily, weekly, or custom duration rates. Offer add-ons like setup, cleaning, or professional assistance.</p>
              </div>
              <div className={css.whyItem}>
                <h4>Community Trust</h4>
                <p>Verified users and a robust review system ensure a high-quality environment for both providers and customers.</p>
              </div>
              <div className={css.whyItem}>
                <h4>Full Control</h4>
                <p>It's your store. You decide who rents, when they rent, and how you handle your business operations.</p>
              </div>
            </div>
          </section>

          {/* How it Works (Numbered Steps) */}
          <section className={css.stepsSection}>
            <div className={css.stepsWrapper}>
              <h2 className={css.sectionTitle}>Four Steps to Launch</h2>
              <ol className={css.stepsList}>
                <li className={css.stepItem}>
                  <span className={css.stepNumber}>01</span>
                  <div className={css.stepText}>
                    <h5>Create Your Account</h5>
                    <p>Sign up in minutes and verify your identity to join our trusted network.</p>
                  </div>
                </li>
                <li className={css.stepItem}>
                  <span className={css.stepNumber}>02</span>
                  <div className={css.stepText}>
                    <h5>List Your Inventory</h5>
                    <p>Add photos, descriptions, and set your rental pricing and security deposits.</p>
                  </div>
                </li>
                <li className={css.stepItem}>
                  <span className={css.stepNumber}>03</span>
                  <div className={css.stepText}>
                    <h5>Configure Policies</h5>
                    <p>Determine your fulfillment methods (Pickup vs Delivery) and cancellation rules.</p>
                  </div>
                </li>
                <li className={css.stepItem}>
                  <span className={css.stepNumber}>04</span>
                  <div className={css.stepText}>
                    <h5>Go Live</h5>
                    <p>Open your store to the community and start generating revenue from your idle assets.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Transparent Fees */}
          <section className={css.feesSection}>
            <div className={css.feesContainer}>
              <h2 className={css.sectionTitle}>Transparent Pricing</h2>
              <p>No hidden costs. No monthly subscriptions. No setup fees.</p>
              <div className={css.feeBox}>
                <div className={css.feeValue}>Only 15%</div>
                <div className={css.feeLabel}>Service Fee on Completed Rentals</div>
                <p className={css.feeSubtext}>We only earn when you earn. This fee covers payment processing, platform maintenance, and support.</p>
              </div>
            </div>
          </section>

          {/* Ultimate CTA */}
          <section className={css.finalCta}>
            <div className={css.ctaBackground}>
              <h2>Ready to build something amazing?</h2>
              <p>Join hundreds of local providers turning storage into opportunity.</p>
              <NamedLink name="SignupPage" className={css.ultimateButton}>Build My Store Now</NamedLink>
            </div>
          </section>

        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default BuildStorePage;
