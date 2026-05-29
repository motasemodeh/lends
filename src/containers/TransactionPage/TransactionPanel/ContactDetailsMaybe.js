import React from 'react';

const ContactDetailsMaybe = props => {
  const { transactionRole, protectedData, customer, provider, className } = props;

  let phoneNumber = null;

  if (transactionRole === 'provider') {
    // Provider seeing Customer's phone number
    phoneNumber = protectedData?.phoneNumber || customer?.attributes?.profile?.protectedData?.phoneNumber;
  } else if (transactionRole === 'customer') {
    // Customer seeing Provider's phone number
    phoneNumber = provider?.attributes?.profile?.protectedData?.phoneNumber;
  }

  const partyName = transactionRole === 'provider' 
    ? (customer?.attributes?.profile?.displayName || 'Customer')
    : (provider?.attributes?.profile?.displayName || 'Provider');

  if (!phoneNumber) {
    return (
      <div className={className} style={{ marginTop: '24px' }}>
        <h3 style={{ margin: 0, marginBottom: '8px', fontSize: '18px' }}>Contact Information</h3>
        <p style={{ margin: 0 }}>{partyName} has not provided a phone number.</p>
      </div>
    );
  }

  return (
    <div className={className} style={{ marginTop: '24px' }}>
      <h3 style={{ margin: 0, marginBottom: '8px', fontSize: '18px' }}>Contact Information</h3>
      <p style={{ margin: 0, fontSize: '16px' }}>
        <strong>{partyName}'s Phone:</strong> {phoneNumber}
      </p>
    </div>
  );
};

export default ContactDetailsMaybe;
