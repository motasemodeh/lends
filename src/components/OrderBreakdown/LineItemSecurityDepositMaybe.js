import React from 'react';
import { useIntl } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_SECURITY_DEPOSIT, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './OrderBreakdown.module.css';

const { Money } = sdkTypes;

const LineItemSecurityDepositMaybe = props => {
  const { lineItems, securityDepositAmount, currency, intl } = props;

  const securityDepositItem = Array.isArray(lineItems) ? lineItems.find(
    item => item.code === LINE_ITEM_SECURITY_DEPOSIT && !item.reversal
  ) : null;

  // If we have a line item (old behavior), show it.
  // Otherwise, if we have a securityDepositAmount from publicData, show it as a hold.
  if (!securityDepositItem && !securityDepositAmount) {
    return null;
  }

  const label = securityDepositItem 
    ? intl.formatMessage({ id: 'OrderBreakdown.securityDeposit' })
    : intl.formatMessage({ id: 'OrderBreakdown.securityDepositHold', defaultMessage: 'Security deposit (hold)' });

  const value = securityDepositItem
    ? formatMoney(intl, securityDepositItem.lineTotal)
    : formatMoney(intl, new Money(securityDepositAmount, currency));

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>{label}</span>
      <span className={css.itemValue}>{value}</span>
    </div>
  );
};

LineItemSecurityDepositMaybe.propTypes = {
  lineItems: propTypes.lineItems,
};

export default LineItemSecurityDepositMaybe;
