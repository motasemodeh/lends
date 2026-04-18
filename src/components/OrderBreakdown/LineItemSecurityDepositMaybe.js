import React from 'react';
import { useIntl } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_SECURITY_DEPOSIT, propTypes } from '../../util/types';

import css from './OrderBreakdown.module.css';

const LineItemSecurityDepositMaybe = props => {
  const { lineItems } = props;
  const intl = useIntl();

  const securityDepositItem = lineItems.find(
    item => item.code === LINE_ITEM_SECURITY_DEPOSIT && !item.reversal
  );

  if (!securityDepositItem) {
    return null;
  }

  const label = intl.formatMessage({ id: 'OrderBreakdown.securityDeposit' });
  const value = formatMoney(intl, securityDepositItem.lineTotal);

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>{label}</span>
      <span className={css.itemValue}>{value}</span>
    </div>
  );
};

LineItemSecurityDepositMaybe.propTypes = {
  lineItems: propTypes.lineItems.isRequired,
};

export default LineItemSecurityDepositMaybe;
