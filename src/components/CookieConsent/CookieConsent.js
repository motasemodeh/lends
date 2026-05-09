import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { NamedLink, PrimaryButton } from '../../components';

import css from './CookieConsent.module.css';

const COOKIE_CONSENT_KEY = 'lends-cookie-consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to make it feel smoother
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={css.root}>
      <div className={css.container}>
        <div className={css.content}>
          <p className={css.text}>
            <FormattedMessage
              id="CookieConsent.text"
              values={{
                privacyPolicyLink: (
                  <NamedLink name="PrivacyPolicyPage" className={css.link}>
                    <FormattedMessage id="CookieConsent.privacyPolicyLink" />
                  </NamedLink>
                ),
              }}
            />
          </p>
          <div className={css.actions}>
            <PrimaryButton className={css.button} onClick={handleAccept}>
              <FormattedMessage id="CookieConsent.accept" />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
