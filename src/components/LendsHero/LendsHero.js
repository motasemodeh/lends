import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import NamedLink from '../NamedLink/NamedLink';

import css from './LendsHero.module.css';
import heroImage from './lends_hero_v3_1776438899218.png';

const LendsHero = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.backgroundWrapper}>
        <img src={heroImage} alt="Lends Gear" className={css.heroImage} />
        <div className={css.overlay} />
      </div>
      
      <div className={css.content}>
        <div className={css.textGroup}>
          <h1 className={css.title}>
            <span className={css.brandName}>LENDS</span>
            <span className={css.mainTitle}>Don’t buy it.<br />Rent it from someone who already has it.</span>
          </h1>
          <p className={css.subtitle}>
            LENDS is a local marketplace for renting distinctive items and services from people nearby. 
            If it’s sitting in storage, it should be paying for itself — and if you need something special, 
            you shouldn’t have to buy it. List what you own or access better things without the waste.
          </p>
          
          <div className={css.ctaGroup}>
            <NamedLink name="SearchPage" className={css.primaryButton}>
              Explore Marketplace
            </NamedLink>
            <NamedLink name="NewListingPage" className={css.secondaryButton}>
              Become a Host
            </NamedLink>
          </div>
        </div>
        
        <div className={css.statsGroup}>
          <div className={css.statItem}>
            <span className={css.statValue}>1,200+</span>
            <span className={css.statLabel}>Items Listed</span>
          </div>
          <div className={css.statDivider} />
          <div className={css.statItem}>
            <span className={css.statValue}>4.9/5</span>
            <span className={css.statLabel}>User Rating</span>
          </div>
          <div className={css.statDivider} />
          <div className={css.statItem}>
            <span className={css.statValue}>24/7</span>
            <span className={css.statLabel}>Support Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendsHero;
