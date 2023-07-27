import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import axiosClient from '../../axios';

const EsewaSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oid = searchParams.get('oid');
  const amt = searchParams.get('amt');
  const refId = searchParams.get('refId');
  console.log(oid, amt, refId);

  const verificationPath = "https://uat.esewa.com.np/epay/transrec";

  const verificationFormRef = useRef(null);

   const handlePaymentVerification = () => {
    // Handle payment success
    axiosClient
      .post('/esewa-payment', { oid: oid.toString(), amt: amt.toString() })
      .then((response) => {
        toast(response.message);
        verificationFormRef.current.submit();
      })
      .catch((error) => {
        console.log(error);
        toast(error);
        verificationFormRef.current.submit();
      });
  };

  return (
    <div>
      <form ref={verificationFormRef} method="POST" action={verificationPath}>
        <input type="hidden" name="amt" value={amt} />
        <input type="hidden" name="rid" value={refId} />
        <input type="hidden" name="pid" value={oid} />
        <input type="hidden" name="scd" value="EPAYTEST" />
        <input type="submit" style={{ display: 'none' }} />
      </form>
      <div className='m-auto px-10 py-5 flex justify-center items-center'>
        <button className='px-5 py-3 m-auto bg-green-500 rounded-lg' onClick={handlePaymentVerification}>Verify Payment</button>
      </div>
    </div>
  );
};

export default EsewaSuccess;
