import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const EsewaPayment = () => {
    const location = useLocation();
    const { bookOrderId,

        totalAmount,
        } = location.state || {};

  const paymentPath = "https://uat.esewa.com.np/epay/main";


  const paymentParams = {
    amt: totalAmount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: totalAmount,
    pid: bookOrderId,
    scd: "EPAYTEST",
    su: "http://localhost:3000/success",
    fu: "http://localhost:3000"
  };


  const paymentFormRef = useRef(null);

  useEffect(() => {
    initiatePayment();
  }, []);

  const initiatePayment = () => {
        paymentFormRef.current.submit();

   };


  return (
    <div>
      <form ref={paymentFormRef} action={paymentPath} method="POST">
        {Object.entries(paymentParams).map(([key, value]) => (
          <input type="hidden" name={key} value={value} key={key} />
        ))}
        <input type="submit" value="Make Payment" style={{ display: 'none' }} />
      </form>
      <div>
        <p className='m-auto'>Redirecting to eSewa...</p>
      </div>
    </div>
  );
};

export default EsewaPayment;
