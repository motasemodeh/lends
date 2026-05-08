import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';

import { useConfiguration } from '../../context/configurationContext';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';
import { pathByRouteName } from '../../util/routes';

import {
  LayoutSingleColumn,
  TopbarSimplified,
  PrimaryButton,
  SecondaryButton,
  NamedLink,
} from '../../components';

import css from './CheckoutSuccessPage.module.css';

const CheckoutSuccessPage = () => {
  const intl = useIntl();
  const history = useHistory();
  const routeConfiguration = useRouteConfiguration();
  const { id } = useParams();

  const handleViewOrder = () => {
    const path = pathByRouteName('OrderDetailsPage', routeConfiguration, { id });
    history.push(path);
  };

  const handleReturnHome = () => {
    history.push('/');
  };

  return (
    <div className={css.root}>
      <TopbarSimplified />
      <LayoutSingleColumn className={css.layout}>
        <div className={css.content}>
          <div className={css.iconContainer}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="32" fill="#059669" />
              <path
                d="M18 32L28 42L46 24"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className={css.title}>
            <FormattedMessage id="CheckoutSuccessPage.title" defaultMessage="Booking Request Sent!" />
          </h1>
          <p className={css.description}>
            <FormattedMessage
              id="CheckoutSuccessPage.description"
              defaultMessage="Thank you for booking! Your request has been sent to the owner."
            />
          </p>
          <div className={css.infoBox}>
            <p className={css.infoText}>
              <FormattedMessage
                id="CheckoutSuccessPage.nextSteps"
                defaultMessage="The provider now has to accept the listing to move forward. You will be notified as soon as they respond."
              />
            </p>
          </div>
          <div className={css.actions}>
            <PrimaryButton className={css.button} onClick={handleViewOrder}>
              <FormattedMessage id="CheckoutSuccessPage.viewOrder" defaultMessage="View Booking Details" />
            </PrimaryButton>
            <SecondaryButton className={css.button} onClick={handleReturnHome}>
              <FormattedMessage id="CheckoutSuccessPage.returnHome" defaultMessage="Return to Home" />
            </SecondaryButton>
          </div>
        </div>
      </LayoutSingleColumn>
    </div>
  );
};

export default CheckoutSuccessPage;
