import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsAgreed } from '../../redux/isAgreedSlice';

export const OrderSummary = ({ subtotal, VAT, total }) => {
  const dispatch = useDispatch();
  const isAgreed = useSelector((state) => state.isAgreed.isAgreed);

  const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;

  // Handle checkbox change to accept terms of payment
  const handleCheckboxChange = () => {
    dispatch(setIsAgreed(!isAgreed));
  };

  return (
    <>
      <div className="flex flex-col justify-start md:border md:border-slate-500 p-5 md:rounded-lg h-fit md:w-1/2">
        <h2 className="text-xl text-purple-900 font-bold mb-2">Order Summary</h2>
        <hr className="border-slate-600 w-full mb-2 md:hidden" />
        <div className="flex justify-between">
          <p className="text-md font-normal">Subtotal:</p>
          <p className="text-md font-normal">Rs.{subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-md font-normal">VAT(13%)</p>
          <p className="text-md font-normal">Rs.{subtotal * VAT}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-md font-normal">Total</p>
          <p className="text-md font-normal">Rs.{total}</p>
        </div>

        <div className="my-4">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="align-middle">I accept the terms of payment</label>
        </div>

        {/* Checkout button with a link */}
        <Link
          to={isAgreed === true && `/event/${selectedEvent.title}/cart-form/customer-details`}
          className={`md:hidden bg-purple-900 text-white py-2 rounded flex items-center justify-center w-fit h-fit px-5 ${
            !isAgreed ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          Checkout
        </Link>

        {/* Checkout button without a link (hidden on mobile) */}
        <button
          className={`hidden md:flex bg-purple-900 text-white py-2 rounded items-center justify-center w-fit h-fit px-5 ${
            !isAgreed ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          Checkout
        </button>
      </div>
    </>
  );
};
