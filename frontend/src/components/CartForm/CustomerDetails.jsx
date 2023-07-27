import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStateContext } from '../../contents/ContextProvider';
import axiosClient from '../../axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import esewa from "../../assets/esewa.png";

const CustomerDetails = () => {
    const navigate = useNavigate();


    const currentUser= JSON.parse(localStorage.getItem('USER'));



  useEffect(() => {
    console.log(currentUser.email, currentUser.id, currentUser.name, currentUser.phoneNumber);
  }, [currentUser]);


  const isAgreed = useSelector((state) => state.isAgreed.isAgreed);

  const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;

  const count = useSelector((state) => state.count.count);


  useEffect(()=>{

    if(!selectedEvent){
        navigate('/')
      }
})
console.log(count, selectedEvent);

  const cartTotal = selectedEvent ? selectedEvent.price * count : 0;
  const VAT = 0.2; // Example VAT rate
  const subtotal = cartTotal;
  const total = subtotal + subtotal * VAT;

  const [formData, setFormData] = useState({
    userId: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    address: '',
    phoneNumber: currentUser.phoneNumber,
    eventId: selectedEvent.id,
    noOfPeople: count,
    totalAmount: total,
    verificationStatus: false,
    bookOrderId : Date.now()
  });


useEffect(()=>{
    console.log(isAgreed)
})

  const [verificationCode, setVerificationCode]=useState();





  useEffect(() => {
    console.log(formData);
  }, [formData]);




  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setVerificationCode(value);
  };


  const sendVerificationCode = () => {
    const phone_number = parseInt(formData.phoneNumber, 10);
    axiosClient
      .post('/verify-phone',{ phoneNumber:phone_number}, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        const verifyCode = response.data.verification_code.toString()
        console.log(verifyCode);

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          console.log(error);
          toast('Internal server error');
        }
      });
  };

  const booking = () => {
    axiosClient
      .post('/createBooking',{
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        eventId: formData.eventId,
        noOfPeople: formData.noOfPeople,
        totalAmount: formData.totalAmount,
        verificationStatus: formData.verificationStatus,
        bookOrderId: formData.bookOrderId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
          console.log(error)
        } else {
          console.log(error);
          toast('Internal server error');
        }
      });
  };

  const verifyCode = (e) => {
    e.preventDefault();
    axiosClient
      .post('/verify-code', { phoneNumber:formData.phoneNumber,
        verificationCode: verificationCode,}, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setFormData(prevFormData => ({
          ...prevFormData,
          verificationStatus: true
        }));

        // Rest of code if success
        if (response.data.verificationStatus === true) {
            booking();
          try {
            navigate('/esewa', {
              state: {
                bookOrderId: formData.bookOrderId,
                totalAmount: formData.totalAmount,
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          toast.error(errorMessages.join("\n"));
        } else {
          console.log(error);
          toast("Internal server error");
        }
      });
  };





  return (
    <div className="flex flex-col p-5 h-fit w-fit md:border md:border-slate-800 md:border-opacity-50 m-auto rounded-lg md:w-1/2">
      <h2 className="text-2xl mb-4 text-purple-900 text-center">Enter Your Details</h2>
      <hr className="border-purple-900 my-2" />
      <form className="flex flex-col" onSubmit={verifyCode}>
        <div className="mb-4">
          <label htmlFor="name" className="text-lg flex items-start">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            readOnly
            className="border-b-2 border-purple-900 focus:outline-none w-full md:border md:rounded-lg md:border-black p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="text-lg flex items-start">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isAgreed}
            className="border-b-2 border-purple-900 py-1 focus:outline-none w-full md:border md:rounded-lg md:border-black p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="text-lg flex items-start">
            Mobile No:
          </label>
          <div className="flex justify-between">
            <input
              type="number"
              id="mobile"
              name="phoneNumber"
              value={formData.phoneNumber}
              readOnly
              className="border-b-2 border-purple-900 py-1 focus:outline-none w-full md:border md:rounded-lg md:border-black p-2"
            />
            <button
              type="button"
              className="bg-purple-900 text-white px-4 py-2 ml-4 rounded"
              disabled={!isAgreed}
              onClick={sendVerificationCode}
            >
              Verify
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="verificationCode" className="text-lg flex items-start">
            Verification Code:
          </label>
          <input
            type="number"
            id="verificationCode"
            name="verificationCode"
            value={parseInt(verificationCode)}
            onChange={handleChange}
            disabled={!isAgreed}
            className="border-b-2 border-purple-900 py-1 focus:outline-none w-full md:border md:rounded-lg md:border-black p-2"
          />
          <div className="md:hidden flex justify-between items-start mt-4">
            <p>Total Payable</p> <p> NRs{total}</p>
          </div>
        </div>
        <div className="flex justify-between h-[50px] space-x-5">
          <button
            type="submit"
            disabled={!isAgreed}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center w-1/2"

          >
            Proceed to Payment
          </button>
          <img src={esewa} alt="esewa" className="w-1/2" />
        </div>

      </form>
      <p className='text-sm text-slate-600'>Your must checkout first.</p>



    </div>
  );
};

export default CustomerDetails;
