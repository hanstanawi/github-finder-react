import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert-${alert.messageType}`}>
        <i className='fas fa-info-circle' /> {alert.message}
      </div>
    )
  );
};

export default Alert;
