import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';

// Import configs and util modules
import appSettings from '../../../../config/settings';
import { FormattedMessage, useIntl } from '../../../../util/reactIntl';
import * as validators from '../../../../util/validators';

// Import shared components
import { Button, Form, FieldCurrencyInput, FieldTextInput, FieldSelect, IconClose } from '../../../../components';

import css from './EditListingPolicyForm.module.css';

const ErrorMessages = props => {
  const { fetchErrors } = props;
  const { updateListingError, showListingsError } = fetchErrors || {};

  return (
    <>
      {updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPolicyForm.updateFailed" />
        </p>
      ) : null}
      {showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingPolicyForm.showListingFailed" />
        </p>
      ) : null}
    </>
  );
};

export const EditListingPolicyFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      ...arrayMutators,
    }}
    render={formRenderProps => {
      const {
        formId = 'EditListingPolicyForm',
        className,
        rootClassName,
        disabled,
        ready,
        handleSubmit,
        marketplaceCurrency,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress = false,
        fetchErrors,
        values,
      } = formRenderProps;

      const intl = useIntl();

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const currencyConfig = appSettings.getCurrencyFormatting(marketplaceCurrency);

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          <ErrorMessages fetchErrors={fetchErrors} />

          <FieldCurrencyInput
            id={`${formId}securityDepositAmount`}
            name="securityDepositAmount"
            className={css.input}
            label={intl.formatMessage({ id: 'EditListingPolicyForm.securityDepositLabel' })}
            placeholder={intl.formatMessage({
              id: 'EditListingPolicyForm.securityDepositPlaceholder',
            })}
            currencyConfig={currencyConfig}
          />

          <p className={css.infoText}>
            <FormattedMessage id="EditListingPolicyForm.securityDepositInfo" />
          </p>

          <div className={css.deliverySection}>
            <FieldSelect
              id={`${formId}.deliveryMethod`}
              name="deliveryMethod"
              className={css.deliverySelect}
              label={intl.formatMessage({ id: 'EditListingPolicyForm.deliveryMethodLabel' })}
            >
              <option value="pickup">
                {intl.formatMessage({ id: 'EditListingPolicyForm.pickupOption' })}
              </option>
              <option value="delivery">
                {intl.formatMessage({ id: 'EditListingPolicyForm.deliveryOption' })}
              </option>
              <option value="both">
                {intl.formatMessage({ id: 'EditListingPolicyForm.bothOption' })}
              </option>
            </FieldSelect>
            <p className={css.infoText}>
              <FormattedMessage id="EditListingPolicyForm.deliveryMethodInfo" />
            </p>
          </div>

          <div className={css.addOnsSection}>
            <h3 className={css.addOnsTitle}>
              <FormattedMessage id="EditListingPolicyForm.addOnsTitle" />
            </h3>
            <p className={css.addOnsDescription}>
              <FormattedMessage id="EditListingPolicyForm.addOnsDescription" />
            </p>

            <FieldArray name="addOns">
              {({ fields }) => (
                <div className={css.addOnsList}>
                  {fields.map((name, index) => (
                    <div key={name} className={css.addOnItem}>
                      <div className={css.addOnFields}>
                        <FieldTextInput
                          id={`${formId}.${name}.label`}
                          name={`${name}.label`}
                          className={css.addOnNameInput}
                          label={intl.formatMessage({ id: 'EditListingPolicyForm.addOnNameLabel' })}
                          placeholder={intl.formatMessage({
                            id: 'EditListingPolicyForm.addOnNamePlaceholder',
                          })}
                          validate={validators.required(
                            intl.formatMessage({ id: 'EditListingPolicyForm.addOnNameRequired' })
                          )}
                        />
                        <FieldCurrencyInput
                          id={`${formId}.${name}.price`}
                          name={`${name}.price`}
                          className={css.addOnPriceInput}
                          label={intl.formatMessage({ id: 'EditListingPolicyForm.addOnPriceLabel' })}
                          currencyConfig={currencyConfig}
                          validate={validators.required(
                            intl.formatMessage({ id: 'EditListingPolicyForm.addOnPriceRequired' })
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        rootClassName={css.removeAddOnButton}
                        onClick={() => fields.remove(index)}
                        title={intl.formatMessage({ id: 'EditListingPolicyForm.removeAddOnButton' })}
                      >
                        <IconClose className={css.removeIcon} />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    rootClassName={css.addAddOnButton}
                    onClick={() => fields.push({ label: '', price: null, id: `addon_${Date.now()}` })}
                  >
                    <FormattedMessage id="EditListingPolicyForm.addAddOnButton" />
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

export default EditListingPolicyFormComponent;
