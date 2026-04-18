import React from 'react';
import { LayoutSingleColumn, Page, NamedLink } from '../../components';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';
import { useConfiguration } from '../../context/configurationContext';

import css from './GetOrganizedPage.module.css';

const GetOrganizedPage = () => {
  const config = useConfiguration();
  const { marketplaceName } = config;

  return (
    <Page
      title={`Help Getting Organized | ${marketplaceName}`}
      scrollingDisabled={false}
      description="Need help sorting and preparing your storage items for rental? Our team assists with organization, photography, and listing management."
    >
      <LayoutSingleColumn
        className={css.pageRoot}
        topbar={<TopbarContainer />}
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          
          {/* Header Section */}
          <header className={css.headerSection}>
            <div className={css.headerContent}>
              <h1 className={css.title}>Need Help Getting Organized?</h1>
              <p className={css.subtitle}>
                Turn your storage into a streamlined rental shop. We handle the heavy lifting of sorting, 
                organizing, and photographing so you can start earning.
              </p>
            </div>
          </header>

          {/* Main Content Section */}
          <section className={css.mainContent}>
            <div className={css.container}>
              <div className={css.textBlock}>
                <p className={css.introText}>
                  Have a storage unit full of great stuff, but no idea where to start? 
                  If you own interesting items — props, decor, costumes, gear, sets, or specialty pieces — 
                  but need help sorting, organizing, and preparing them to be rented, we can help.
                </p>
                <p>
                  Our team can work with you to go through your storage, identify what’s worth listing, 
                  help organize it for easy pickup and return, and photograph your items so they’re ready to go live on LENDS. 
                  This is designed to make renting out your things realistic, not overwhelming.
                </p>
              </div>
            </div>
          </section>

          {/* Service Highlights */}
          <section className={css.serviceSection}>
            <div className={css.serviceGrid}>
              <div className={css.serviceCard}>
                <div className={css.cardNum}>01</div>
                <h4>Sorting & Auditing</h4>
                <p>We help you identify which items have high rental potential and what pieces are best for the Lends community.</p>
              </div>
              <div className={css.serviceCard}>
                <div className={css.cardNum}>02</div>
                <h4>Operational Setup</h4>
                <p>Organization for smooth logistics. We label and arrange items so they are ready for quick handovers and returns.</p>
              </div>
              <div className={css.serviceCard}>
                <div className={css.cardNum}>03</div>
                <h4>Pro Photography</h4>
                <p>Great photos sell rentals. We take clean, high-resolution shots of your items to make your storefront look its best.</p>
              </div>
            </div>
          </section>

          {/* Value Prop Section */}
          <section className={css.valueProp}>
            <div className={css.valueContainer}>
              <h2>Realistic, Not Overwhelming.</h2>
              <p>We understand that inventory management can be daunting. Our goal is to set you up for success with zero stress.</p>
            </div>
          </section>

          {/* Contact/CTA Section */}
          <section className={css.ctaSection}>
            <div className={css.ctaBox}>
              <h3>Ready to start sorting?</h3>
              <p>Schedule a consultation with our team to discuss your storage and how we can help you go live.</p>
              <a 
                href="https://docs.google.com/forms/d/1jl08_Oix-HZJwHArTzNDjtmvlBdgfQj-QNDgF3gMtHQ/edit" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={css.ctaButton}
              >
                Connect With Us
              </a>
            </div>
          </section>

        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default GetOrganizedPage;
