import React from 'react';

import css from './SectionHowItWorks.module.css';

/**
 * SectionHowItWorks - Premium "How LENDS Works" section for the landing page.
 * Displays a 3-step process with numbered steps and icons.
 *
 * @component
 * @returns {JSX.Element}
 */
const SectionHowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Find What You Need',
      description:
        'Browse distinctive items and services listed by people near you. Choose rentals on their own or items that include optional or required services like delivery, setup, or operation.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Book and Pay',
      description:
        'Select your dates, review the full upfront price, and book directly through the website. Payments, deposits, and extensions are handled in one place with clear pricing.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 14H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 14H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 14H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Coordinate With Ease',
      description:
        'Use built-in direct messaging to coordinate pickup, delivery, or drop-off. Communicate timing, details, and any service needs directly with the lister, then return the item when you\'re done.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 10H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 10H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 10H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className={css.root}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.sectionTitle}>
            How <span className={css.brand}>LENDS</span> Works
          </h2>
          <p className={css.subtitle}>
            Easily rent or lend unique items in your city with just a few simple steps.
          </p>
        </div>

        <div className={css.stepsGrid}>
          {steps.map((step, index) => (
            <div key={step.number} className={css.stepCard}>
              <div className={css.stepNumber}>{step.number}</div>
              <div className={css.stepIconWrapper}>
                {step.icon}
              </div>
              <h3 className={css.stepTitle}>{step.title}</h3>
              <p className={css.stepDescription}>{step.description}</p>
              {index < steps.length - 1 && (
                <div className={css.connector}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionHowItWorks;
