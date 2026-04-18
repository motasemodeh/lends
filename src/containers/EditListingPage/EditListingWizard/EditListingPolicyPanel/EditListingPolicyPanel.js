import React, { useState } from 'react';
import classNames from 'classnames';

// Import configs and util modules
import { FormattedMessage } from '../../../../util/reactIntl';
import { LISTING_STATE_DRAFT, propTypes } from '../../../../util/types';
import { types as sdkTypes } from '../../../../util/sdkLoader';

// Import shared components
import { H3, ListingLink } from '../../../../components';

// Import modules from this directory
import EditListingPolicyForm from './EditListingPolicyForm';
import css from './EditListingPolicyPanel.module.css';

const { Money } = sdkTypes;

const getInitialValues = props => {
  const { listing } = props;
  const { publicData } = listing?.attributes || {};
  const { securityDepositAmount, addOnsConfiguration, deliveryMethod } = publicData || {};

  let addOns = [];
  if (addOnsConfiguration) {
    try {
      addOns = JSON.parse(addOnsConfiguration);
    } catch (e) {
      console.error('Failed to parse addOnsConfiguration:', e);
    }
  }

  return {
    securityDepositAmount: securityDepositAmount
      ? new Money(securityDepositAmount, listing.attributes.price.currency)
      : null,
    addOns: addOns.map(addon => ({
      ...addon,
      price:
        addon.price !== null && addon.price !== undefined
          ? new Money(addon.price, listing.attributes.price.currency)
          : null,
    })),
    deliveryMethod: deliveryMethod || 'pickup',
  };
};

const EditListingPolicyPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    marketplaceCurrency,
    disabled,
    ready,
    onSubmit,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    updatePageTitle: UpdatePageTitle,
    intl,
  } = props;

  const [state, setState] = useState({ initialValues: getInitialValues(props) });

  const classes = classNames(rootClassName || css.root, className);
  const initialValues = state.initialValues;
  const isPublished = listing?.id && listing?.attributes?.state !== LISTING_STATE_DRAFT;

  const panelHeadingProps = isPublished
    ? {
        id: 'EditListingPolicyPanel.title',
        values: { listingTitle: <ListingLink listing={listing} />, lineBreak: <br /> },
        messageProps: { listingTitle: listing.attributes.title },
      }
    : {
        id: 'EditListingPolicyPanel.createListingTitle',
        values: { lineBreak: <br /> },
        messageProps: {},
      };

  return (
    <main className={classes}>
      <UpdatePageTitle
        panelHeading={intl.formatMessage(
          { id: panelHeadingProps.id },
          { ...panelHeadingProps.messageProps }
        )}
      />
      <H3 as="h1">
        <FormattedMessage id={panelHeadingProps.id} values={{ ...panelHeadingProps.values }} />
      </H3>

      <EditListingPolicyForm
        className={css.form}
        initialValues={initialValues}
        onSubmit={values => {
          const { securityDepositAmount, addOns, deliveryMethod } = values;

          const updateValues = {
            publicData: {
              securityDepositAmount: securityDepositAmount ? securityDepositAmount.amount : null,
              addOnsConfiguration: JSON.stringify(
                (addOns || []).map(addon => ({
                  ...addon,
                  price: addon.price ? addon.price.amount : 0,
                }))
              ),
              deliveryMethod,
            },
          };

          setState({
            initialValues: {
              securityDepositAmount,
              addOns,
              deliveryMethod,
            },
          });
          onSubmit(updateValues);
        }}
        marketplaceCurrency={marketplaceCurrency}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </main>
  );
};

export default EditListingPolicyPanel;
