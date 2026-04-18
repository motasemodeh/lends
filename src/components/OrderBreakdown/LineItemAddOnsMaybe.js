import React from 'react';
import { formatMoney } from '../../util/currency';
import { propTypes } from '../../util/types';

import css from './OrderBreakdown.module.css';

const LineItemAddOnsMaybe = props => {
  const { lineItems, listing, intl } = props;

  const addOnLineItems = lineItems.filter(
    item => item.code.startsWith('line-item/addon-') && !item.reversal
  );

  if (addOnLineItems.length === 0) {
    return null;
  }

  // Get add-ons configuration from listing publicData to find the real labels
  const publicData = listing?.attributes?.publicData || {};
  const addOnsConfiguration = publicData.addOnsConfiguration;
  let availableAddOns = [];
  if (addOnsConfiguration) {
    try {
      availableAddOns = typeof addOnsConfiguration === 'string' ? JSON.parse(addOnsConfiguration) : addOnsConfiguration;
    } catch (e) {
      console.error('Failed to parse addOnsConfiguration in LineItemAddOnsMaybe:', e);
    }
  }

  return (
    <React.Fragment>
      {addOnLineItems.map((item, i) => {
        const addOnId = item.code.replace('line-item/addon-', '');
        const addOnConfig = Array.isArray(availableAddOns) 
          ? availableAddOns.find(a => a.id === addOnId)
          : null;
        
        // Use the label from config if found, otherwise humanize the code
        const label = addOnConfig ? addOnConfig.label : addOnId.charAt(0).toUpperCase() + addOnId.slice(1);
        const value = formatMoney(intl, item.lineTotal);

        return (
          <div key={`${i}-${item.code}`} className={css.lineItem}>
            <span className={css.itemLabel}>{label}</span>
            <span className={css.itemValue}>{value}</span>
          </div>
        );
      })}
    </React.Fragment>
  );
};

LineItemAddOnsMaybe.propTypes = {
  lineItems: propTypes.lineItems.isRequired,
  listing: propTypes.listing,
};

export default LineItemAddOnsMaybe;
