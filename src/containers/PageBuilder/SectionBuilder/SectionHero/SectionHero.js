import React from 'react';
import classNames from 'classnames';

import Field, { hasDataInFields } from '../../Field';

import SectionContainer from '../SectionContainer';
import css from './SectionHero.module.css';

/**
 * @typedef {Object} FieldComponentConfig
 * @property {ReactNode} component
 * @property {Function} pickValidProps
 */

/**
 * Section component for a website's hero section
 * The Section Hero doesn't have any Blocks by default, all the configurations are made in the Section Hero settings
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {Object} props.defaultClasses
 * @param {string} props.defaultClasses.sectionDetails
 * @param {string} props.defaultClasses.title
 * @param {string} props.defaultClasses.description
 * @param {string} props.defaultClasses.ctaButton
 * @param {string} props.sectionId id of the section
 * @param {'hero'} props.sectionType
 * @param {Object?} props.title
 * @param {Object?} props.description
 * @param {Object?} props.appearance
 * @param {Object?} props.callToAction
 * @param {Object} props.options extra options for the section component (e.g. custom fieldComponents)
 * @param {Object<string,FieldComponentConfig>?} props.options.fieldComponents custom fields
 * @returns {JSX.Element} Section for article content
 */
import { NamedLink } from '../../../../components';

const SectionHero = props => {
  const {
    sectionId,
    className,
    rootClassName,
    appearance,
    options,
  } = props;

  const fieldOptions = { fieldComponents: options?.fieldComponents };

  return (
    <SectionContainer
      id={sectionId}
      className={className}
      rootClassName={classNames(rootClassName || css.root)}
      appearance={appearance}
      options={fieldOptions}
    >
      <div className={css.heroContent}>
        <h1 className={css.heroTitle}>
          Rent the<br />Gear. Live<br />the Adventure.
        </h1>
        <p className={css.heroSubtitle}>
          Travel light. Adventure heavy.
        </p>
        <div className={css.heroButtons}>
          <NamedLink name="SearchPage" className={css.primaryButton}>
            Explore Rentals
          </NamedLink>
          <NamedLink name="NewListingPage" className={css.primaryButton}>
            Post a New Listing
          </NamedLink>
        </div>
      </div>
    </SectionContainer>
  );
};

export default SectionHero;
