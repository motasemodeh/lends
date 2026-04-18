import React from 'react';
import { FieldCheckbox } from '../../components';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;

import css from './AddOnSelector.module.css';

/**
 * AddOnSelector component renders a list of add-ons as checkboxes.
 *
 * @param {Object} props
 * @param {Array} props.addOns - List of available add-ons.
 * @param {Object} props.intl - React-Intl object.
 * @param {string} props.currency - The currency of the listing.
 * @param {Function} props.onChange - Callback function when a checkbox value changes.
 */
const AddOnSelector = props => {
  const { addOns, intl, currency, onChange } = props;
  if (!addOns || addOns.length === 0) return null;

  return (
    <div className={css.root}>
      <h3 className={css.title}>
        Add-ons
      </h3>
      <div className={css.addOnsList}>
        {addOns.map(addOn => {
          if (!addOn || !addOn.label || addOn.price === null || addOn.price === undefined) {
            return null;
          }

          try {
            const moneyVal = new Money(addOn.price, currency);
            const formattedAddOnPrice = formatMoney(intl, moneyVal);

            return (
              <div key={addOn.id} className={css.addOnItem}>
                <FieldCheckbox
                  id={`addon-${addOn.id}`}
                  name="addOns"
                  label={
                    intl.formatMessage(
                      { id: 'AddOnSelector.label', defaultMessage: '{label} (+{price})' },
                      { label: addOn.label, price: formattedAddOnPrice }
                    ) || `${addOn.label} (+${formattedAddOnPrice})`
                  }
                  value={addOn.id}
                  onChange={onChange}
                />
              </div>
            );
          } catch (e) {
            console.error('AddOnSelector: failed to render add-on', addOn, e);
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default AddOnSelector;
