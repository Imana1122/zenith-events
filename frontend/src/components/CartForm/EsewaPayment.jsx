import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const EsewaPayment = () => {
  const location = useLocation();
  const { bookOrderId, totalAmount, eventId } = location.state || {};

  // Replace with your production merchant ID
  const merchantId = 'NP-ES-KAFALS';

  // Replace with the production payment URL provided by eSewa
  const paymentPath = 'https://esewa.com.np/epay/main';

  const paymentParams = {
    amt: totalAmount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: totalAmount,
    pid: bookOrderId,
    // Replace with your production service code
    scd: 'NP-ES-KAFALS',
    // Replace with your production success and failure URLs
    su: 'http://localhost:3000/booking',
    fu: 'http://localhost:3000/',
  };

  const paymentFormRef = useRef(null);

  const initiatePayment = () => {
    paymentFormRef.current.submit();
  };

useEffect(() => {
    initiatePayment();
  }, []);

  return (
    <div>
      <form ref={paymentFormRef} action={paymentPath} method="POST">
        {Object.entries(paymentParams).map(([key, value]) => (
          <input type="hidden" name={key} value={value} key={key} />
        ))}
        {/* Add the input fields for merchant ID and order ID */}
        <input type="hidden" name="oid" value={eventId} />
        <input type="hidden" name="e" value={merchantId} />
        <input type="submit" value="Make Payment" style={{ display: 'none' }} />
      </form>
      <div className="flex justify-center items-center my-20">
        <p className="text-green-800 font-light text-2xl">Redirecting to eSewa...</p>
      </div>
    </div>
  );
};

export default EsewaPayment;
