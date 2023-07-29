import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axiosClient from '../../axios';

const EsewaSuccess = () => {
    const [message, setMessage] = useState("");
    const [error, setError] =useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oid = searchParams.get('oid');
  const amt = searchParams.get('amt');
  const refId = searchParams.get('refId');

  const verificationFormRef = useRef(null);

  useEffect(() => {
    handlePaymentVerification();
  }, []);

   const handlePaymentVerification = () => {
    // Handle payment success
    axiosClient
      .post('/esewa-payment', { oid: oid.toString(), amt: amt.toString() })
      .then((response) => {
        setMessage(response.data.message);
        setError(response.data.error);

      })
      .catch((error) => {
        console.log(error);

      });
  };

  return (
    <div className='my-10 flex flex-col justify-between items-center'>
      <div>{message && <p className='text-green-700 font-thin text-xl my-5'>{message}</p>}{error && <p className='text-green-700 font-thin text-xl my-5'>{error}</p>}</div>
      <p>Watch your bookings <Link to={'/userBookings'} className='text-green-700 text-xl font-bold'>HERE!</Link> </p>
    </div>
  );
};

export default EsewaSuccess;
