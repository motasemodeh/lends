import React, { useState } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import classNames from 'classnames';

import appSettings from '../../../../config/settings';
import { FormattedMessage, useIntl } from '../../../../util/reactIntl';
import { types as sdkTypes } from '../../../../util/sdkLoader';
import * as validators from '../../../../util/validators';

import {
  FieldCurrencyInput,
  FieldTextInput,
  IconDelete,
  InlineTextButton,
} from '../../../../components';

import css from './BookingPriceVariants.module.css'; // Reuse existing styles for consistency

const { Money } = sdkTypes;

/**
 * Get the initial values for the add-ons.
 *
 * @param {Object} listing - The listing entity.
 * @param {string} marketplaceCurrency - The marketplace currency.
 * @returns {Object} An object including the addOns array.
 */
export const getInitialValuesForAddOns = (listing, marketplaceCurrency) => {
  const { publicData } = listing?.attributes || {};
  const { addOnsConfiguration } = publicData || {};

  if (!addOnsConfiguration) {
    return { addOns: [] };
  }

  try {
    const addOns = JSON.parse(addOnsConfiguration);
    return {
      addOns: addOns.map(addOn => ({
        id: addOn.id,
        label: addOn.label,
        price: new Money(addOn.price, marketplaceCurrency),
      })),
    };
  } catch (e) {
    console.error('Failed to parse addOnsConfiguration:', e);
    return { addOns: [] };
  }
};

/**
 * Format the submitted values so that they include the addOnsConfiguration string.
 *
 * @param {Object} values - The submitted form values.
 * @param {Object} publicData - The public data of the listing.
 * @returns {Object} The formatted public data.
 */
export const handleSubmitValuesForAddOns = (values, publicData) => {
  const { addOns } = values;

  if (!addOns || addOns.length === 0) {
    // If no add-ons, we remove the configuration
    const { addOnsConfiguration, ...rest } = publicData;
    return rest;
  }

  const addOnsConfiguration = JSON.stringify(
    addOns.map(addOn => ({
      id: addOn.id || Math.random().toString(36).substr(2, 9),
      label: addOn.label,
      price: addOn.price.amount,
    }))
  );

  return {
    ...publicData,
    addOnsConfiguration,
  };
};

const AddOn = props => {
  const { name, idPrefix, marketplaceCurrency, onRemove, intl } = props;

  const labelRequired = validators.required(
    intl.formatMessage({ id: 'EditListingPricingForm.addOn.labelRequired' })
  );

  const priceRequired = validators.required(
    intl.formatMessage({ id: 'EditListingPricingForm.addOn.priceRequired' })
  );

  return (
    <div className={css.priceVariant}>
      <FieldTextInput
        id={`${idPrefix}_label`}
        name={`${name}.label`}
        label={intl.formatMessage({ id: 'EditListingPricingForm.addOn.label' })}
        placeholder={intl.formatMessage({
          id: 'EditListingPricingForm.addOn.labelPlaceholder',
        })}
        validate={labelRequired}
      />

      <FieldCurrencyInput
        id={`${idPrefix}_price`}
        name={`${name}.price`}
        label={intl.formatMessage({ id: 'EditListingPricingForm.addOn.price' })}
        placeholder={intl.formatMessage({
          id: 'EditListingPricingForm.addOn.pricePlaceholder',
        })}
        currencyConfig={appSettings.getCurrencyFormatting(marketplaceCurrency)}
        validate={priceRequired}
      />

      <InlineTextButton className={css.fieldArrayDelete} type="button" onClick={onRemove}>
        <span>
          <IconDelete rootClassName={css.deleteIcon} />
          <FormattedMessage id="EditListingPricingForm.addOn.delete" />
        </span>
      </InlineTextButton>
    </div>
  );
};

// Handle unique keys for each array item.
const initAddOnKeys = initialLength => {
  const counter = initialLength || 0;
  const keys = Array.from({ length: counter }, (_, i) => `addOnKey_${i}`);
  return [counter, keys];
};

const addNewAddOnKey = setAddOnKeys => {
  setAddOnKeys(([counter, addOnKeys]) => [counter + 1, [...addOnKeys, `addOnKey_${counter}`]]);
};

const removeAddOnKey = (setAddOnKeys, index) => {
  setAddOnKeys(([counter, addOnKeys]) => [
    counter,
    [...addOnKeys.slice(0, index), ...addOnKeys.slice(index + 1)],
  ]);
};

export const ListingAddOns = props => {
  const intl = useIntl();
  const { initialLength = 0, marketplaceCurrency } = props;
  const [data, setAddOnKeys] = useState(initAddOnKeys(initialLength));
  const [counter, addOnKeys] = data;

  return (
    <div className={css.addOnsContainer}>
      <h3 className={css.sectionTitle}>
        <FormattedMessage id="EditListingPricingForm.addOnsTitle" />
      </h3>
      <FieldArray name="addOns">
        {({ fields }) => (
          <>
            <div className={css.priceVariants}>
              {fields.map((name, index) => (
                <AddOn
                  key={addOnKeys[index]}
                  name={name}
                  idPrefix={`addOn_${index}`}
                  marketplaceCurrency={marketplaceCurrency}
                  onRemove={() => {
                    fields.remove(index);
                    removeAddOnKey(setAddOnKeys, index);
                  }}
                  intl={intl}
                />
              ))}
            </div>

            <div className={css.addPriceVariants}>
              <InlineTextButton
                className={css.addPriceVariantButton}
                type="button"
                onClick={() => {
                  fields.push({ label: '', price: null });
                  addNewAddOnKey(setAddOnKeys);
                }}
              >
                <FormattedMessage id="EditListingPricingForm.addAddOn" />
              </InlineTextButton>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default ListingAddOns;
