import React from 'react';
import { FieldCheckbox } from '../../components';
import { FormattedMessage } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;

import css from './AddOnCheckbox.module.css';

/**
 * AddOnCheckbox component renders a list of add-ons as checkboxes.
 *
 * @param {Object} props
 * @param {Array} props.addOns - List of available add-ons.
 * @param {Object} props.intl - React-Intl object.
 * @param {string} props.currency - The currency of the listing.
 */
const AddOnCheckbox = props => {
  const { addOns, intl, currency } = props;
  if (!addOns || addOns.length === 0) return null;

  return (
    <div className={css.root}>
      <h6 className={css.title}>
        <FormattedMessage id="AddOnCheckbox.title" defaultMessage="Available Add-ons" />
      </h6>
      <div className={css.addOnsList}>
        {addOns.map(addOn => {
          const moneyVal = new Money(addOn.price, currency);
          const formattedAddOnPrice = formatMoney(intl, moneyVal);

          return (
            <div key={addOn.id} className={css.addOnItem}>
              <FieldCheckbox
                id={`addon-${addOn.id}`}
                name="addOns"
                label={intl.formatMessage(
                  { id: 'AddOnCheckbox.label', defaultMessage: '{label} (+{price})' },
                  { label: addOn.label, price: formattedAddOnPrice }
                )}
                value={addOn.id}
                onChange={onChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddOnCheckbox;
