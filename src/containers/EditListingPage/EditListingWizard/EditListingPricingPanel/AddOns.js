import React, { useState } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import classNames from 'classnames';

import appSettings from '../../../../config/settings';
import { FormattedMessage, useIntl } from '../../../../util/reactIntl';
import * as validators from '../../../../util/validators';
import {
  FieldCurrencyInput,
  FieldTextInput,
  IconDelete,
  InlineTextButton,
} from '../../../../components';

import css from './AddOns.module.css';

const AddOn = props => {
  const {
    name,
    idPrefix,
    marketplaceCurrency,
    onRemoveAddOn,
    intl,
  } = props;

  const labelRequired = validators.required(
    intl.formatMessage({ id: 'EditListingPricingForm.addOn.labelRequired' })
  );
  const priceRequired = validators.required(
    intl.formatMessage({ id: 'EditListingPricingForm.addOn.priceRequired' })
  );

  return (
    <div className={css.addOn}>
      <div className={css.addOnFields}>
        <FieldTextInput
          id={`${idPrefix}_label`}
          name={`${name}.label`}
          className={css.labelInput}
          label={intl.formatMessage({ id: 'EditListingPricingForm.addOn.label' })}
          placeholder={intl.formatMessage({
            id: 'EditListingPricingForm.addOn.labelInputPlaceholder',
          })}
          validate={labelRequired}
        />

        <FieldCurrencyInput
          id={`${idPrefix}_price`}
          name={`${name}.price`}
          className={css.priceInput}
          label={intl.formatMessage({ id: 'EditListingPricingForm.addOn.price' })}
          placeholder={intl.formatMessage({
            id: 'EditListingPricingForm.addOn.priceInputPlaceholder',
          })}
          currencyConfig={appSettings.getCurrencyFormatting(marketplaceCurrency)}
          validate={priceRequired}
        />
      </div>

      <InlineTextButton
        className={css.fieldArrayDelete}
        type="button"
        onClick={onRemoveAddOn}
      >
        <span>
          <IconDelete rootClassName={css.deleteIcon} />
          <FormattedMessage id="EditListingPricingForm.addOn.delete" />
        </span>
      </InlineTextButton>
    </div>
  );
};

const initKeys = initialLength => {
  const counter = initialLength || 0;
  const keys = counter > 0 ? [...Array(initialLength)].map((_, i) => `addOnKey_${i}`) : [];
  return [counter, keys];
};

/**
 * AddOns component for EditListingPricingForm.
 *
 * @param {Object} props
 * @param {string} props.marketplaceCurrency - The marketplace currency
 * @param {number} props.initialLength - Initial number of add-ons
 */
const AddOns = props => {
  const intl = useIntl();
  const [keysData, setKeys] = useState(initKeys(props.initialLength || 0));
  const [counter, keys] = keysData;

  const { marketplaceCurrency } = props;

  return (
    <div className={css.root}>
      <h3 className={css.title}>
        <FormattedMessage id="EditListingPricingForm.addOnsTitle" />
      </h3>
      <p className={css.description}>
        <FormattedMessage id="EditListingPricingForm.addOnsDescription" />
      </p>

      <FieldArray name="addOns">
        {({ fields }) => (
          <>
            <div className={css.addOnsList}>
              {fields.map((name, index) => (
                <AddOn
                  key={keys[index]}
                  name={name}
                  idPrefix={`addOn_${index}`}
                  marketplaceCurrency={marketplaceCurrency}
                  onRemoveAddOn={() => {
                    fields.remove(index);
                    setKeys(([c, k]) => [c, [...k.slice(0, index), ...k.slice(index + 1)]]);
                  }}
                  intl={intl}
                />
              ))}
            </div>

            <div className={css.addAddOnContainer}>
              <InlineTextButton
                className={css.addAddOnButton}
                type="button"
                onClick={() => {
                  fields.push({ label: '', price: null });
                  setKeys(([c, k]) => [c + 1, [...k, `addOnKey_${c}`]]);
                }}
              >
                <FormattedMessage id="EditListingPricingForm.addOns.addAddOn" />
              </InlineTextButton>
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default AddOns;
