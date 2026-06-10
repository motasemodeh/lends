import React, { useState } from 'react';
import { Page, LayoutSingleColumn, NamedLink } from '../../components';
import TopbarContainer from '../../containers/TopbarContainer/TopbarContainer';
import FooterContainer from '../../containers/FooterContainer/FooterContainer';
import { useConfiguration } from '../../context/configurationContext';

import css from './SupportPage.module.css';

const SupportPage = () => {
  const config = useConfiguration();
  const { marketplaceName } = config;

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !message) {
      setError('Please fill out both email and message fields.');
      return;
    }

    setInProgress(true);
    setError(null);

    try {
      const response = await window.fetch('/api/send-support-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message.');
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Support email failed:', err);
      setError(err.message || 'Failed to send your message. Please try again or email us directly.');
    } finally {
      setInProgress(false);
    }
  };

  return (
    <Page
      title={`Support | ${marketplaceName}`}
      scrollingDisabled={false}
      description="Contact the support team for help."
    >
      <LayoutSingleColumn
        className={css.pageRoot}
        topbar={<TopbarContainer />}
        footer={<FooterContainer />}
      >
        <div className={css.content}>
          <div className={css.hero}>
            <div className={css.iconWrap}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
              </svg>
            </div>
            <h1 className={css.heroTitle}>How can we help?</h1>
            <p className={css.heroSubtitle}>
              Need help? Our team is available 24/7. Reach out to us using the form below or email us
              directly at <a href="mailto:help@lends.market" className={css.heroEmail}>help@lends.market</a>
            </p>
          </div>

          <div className={css.formCard}>
            {submitted ? (
              <div className={css.successCard}>
                <div className={css.successIcon}>✓</div>
                <h3 className={css.successTitle}>Message Sent</h3>
                <p className={css.successText}>
                  We've received your request and our team will get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className={css.formTitle}>Contact Support</h2>

                {error && <div className={css.apiError}>{error}</div>}

                <div className={css.field}>
                  <label htmlFor="email" className={css.label}>
                    Your Email <span className={css.required}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={css.input}
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={inProgress}
                  />
                </div>

                <div className={css.field}>
                  <label htmlFor="message" className={css.label}>
                    Message <span className={css.required}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={css.textarea}
                    placeholder="How can we assist you today?"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    disabled={inProgress}
                  />
                </div>

                <button type="submit" className={css.submitButton} disabled={inProgress || !email || !message}>
                  {inProgress ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <hr className={css.divider} />

          <p className={css.directContact}>
            Having trouble with the form? Email us directly at{' '}
            <a href="mailto:help@lends.market">help@lends.market</a>
          </p>
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

export default SupportPage;
