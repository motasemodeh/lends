import React, { useState } from 'react';

const ChecklistMaybe = props => {
  const { transactionRole, deliveryMethod, className } = props;
  
  const [checkedItems, setCheckedItems] = useState({});

  if (transactionRole !== 'provider') {
    return null;
  }

  const toggleCheck = index => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const action = deliveryMethod === 'shipping' ? 'delivery' : 'pickup';
  const actionCap = deliveryMethod === 'shipping' ? 'Delivery' : 'Pickup';

  const items = [
    "Have the renter's phone number",
    `Agreed on ${action} location and time`,
    "Agreed on return location and date/time",
    "Verified renter's name with photo ID (optional)"
  ];

  return (
    <div className={className} style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>Provider Checklist</h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              id={`checklist-${index}`} 
              checked={!!checkedItems[index]} 
              onChange={() => toggleCheck(index)} 
              style={{ marginRight: '12px', width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor={`checklist-${index}`} style={{ cursor: 'pointer', margin: 0, fontSize: '16px' }}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistMaybe;
