import React, { useEffect, useRef, useState } from 'react';

import { useConfiguration } from '../../context/configurationContext';
import { DISCORD_INVITE_URL } from '../../config/discord';

import { Page, LayoutSingleColumn, ExternalLink } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import css from './JoinDiscordPage.module.css';

// Screenshot of the #hosting-101 channel. Drop the image into
// public/static/discord/hosting-101.png – until it exists, a placeholder is shown.
const PREVIEW_IMAGE_SRC = '/static/discord/hosting-101.png';

const FEATURES = [
  {
    title: 'Resources',
    text: 'Guides and answers to common questions about renting and hosting on Lends.',
  },
  {
    title: 'Listing tips',
    text: 'Practical advice for creating rental listings that get noticed and booked.',
  },
  {
    title: 'Meet the community',
    text: 'Connect with other renters and hosts, share experiences and swap ideas.',
  },
];

const DiscordLogo = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 2.5 24 19"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

/**
 * Screenshot of the Discord channel inside a simple app-window frame.
 * Falls back to a placeholder if the image file is missing.
 *
 * @component
 * @returns {JSX.Element}
 */
const ChannelPreview = () => {
  const imgRef = useRef(null);
  const [imageFailed, setImageFailed] = useState(false);

  // With SSR the image may fail before React hydrates and attaches onError,
  // so check its state once on mount as well.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setImageFailed(true);
    }
  }, []);

  return (
    <figure className={css.preview}>
      <div className={css.previewBar}>
        <span className={css.dot} />
        <span className={css.dot} />
        <span className={css.dot} />
        <span className={css.previewChannel}># hosting-101</span>
      </div>
      {imageFailed ? (
        <div className={css.previewPlaceholder}>
          <DiscordLogo className={css.placeholderLogo} />
          <p className={css.placeholderTitle}># hosting-101</p>
          <p className={css.placeholderText}>
            Step-by-step help with creating your first rental listing.
          </p>
        </div>
      ) : (
        <img
          ref={imgRef}
          className={css.previewImage}
          src={PREVIEW_IMAGE_SRC}
          alt="Preview of the Hosting 101 channel in the Lends Discord server"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      <figcaption className={css.previewCaption}>
        A look inside Hosting 101, one of the channels open to everyone who joins.
      </figcaption>
    </figure>
  );
};

/**
 * "Join our Discord" page (/discord). Gives a preview of the community server
 * before linking out to the Discord invite.
 *
 * @component
 * @returns {JSX.Element}
 */
const JoinDiscordPage = () => {
  const config = useConfiguration();
  const { marketplaceName } = config;

  return (
    <Page
      title={`Join our Discord | ${marketplaceName}`}
      scrollingDisabled={false}
      description={`Join the ${marketplaceName} community on Discord for resources, listing tips and a place to meet other renters and hosts.`}
    >
      <LayoutSingleColumn
        className={css.pageRoot}
        topbar={<TopbarContainer />}
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <section className={css.hero}>
            <div className={css.iconWrap}>
              <DiscordLogo className={css.heroLogo} />
            </div>
            <h1 className={css.heroTitle}>Join our Discord</h1>
            <p className={css.heroSubtitle}>
              The {marketplaceName} community lives on Discord. Find resources, get tips on
              creating rental listings, and meet other people renting and hosting on{' '}
              {marketplaceName}.
            </p>
            <ExternalLink href={DISCORD_INVITE_URL} className={css.ctaButton}>
              <DiscordLogo className={css.ctaLogo} />
              Join the server
            </ExternalLink>
            <p className={css.ctaNote}>Free to join. Opens Discord in a new tab.</p>
          </section>

          <section className={css.previewSection}>
            <h2 className={css.sectionTitle}>Take a look inside</h2>
            <ChannelPreview />
          </section>

          <section className={css.featuresSection}>
            <h2 className={css.sectionTitle}>What you'll find</h2>
            <ul className={css.features}>
              {FEATURES.map(f => (
                <li key={f.title} className={css.feature}>
                  <h3 className={css.featureTitle}>{f.title}</h3>
                  <p className={css.featureText}>{f.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={css.bottomCta}>
            <h2 className={css.bottomTitle}>Ready to say hello?</h2>
            <ExternalLink href={DISCORD_INVITE_URL} className={css.ctaButton}>
              <DiscordLogo className={css.ctaLogo} />
              Join the server
            </ExternalLink>
          </section>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default JoinDiscordPage;
