import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { clearSelectedEvent } from '../../redux/eventSlice';

import { resetCount } from '../../redux/countSlice';
import { useNavigate } from 'react-router-dom';
import {BiMinusCircle, BiPlusCircle} from "react-icons/bi"


export const Cart = ({ selectedEvent, count, handleDecrease, handleIncrease, cartTotal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onDeleteEvent = () => {
        dispatch(clearSelectedEvent());
        dispatch(resetCount());
        navigate('/')
      };
  return (
    <>
      {/** Mobile View */}
      <div className="flex flex-col justify-start p-5 md:hidden">
        <div>
          <h2 className="text-xl text-purple-900 font-bold mb-2">Cart</h2>
          <hr className="border-slate-600 w-full my-2" />
        </div>

        {selectedEvent ? (
          <>
            <p className="text-md text-purple-900 font-bold">Product</p>
            <p className="text-2md text-purple-700 mb-10">{selectedEvent.workshop}</p>
            <div className="flex w-full flex-col">
              <div className="mb-5 flex justify-between items-center">
                <p className="text-md text-purple-900 font-bold">Price</p>
                <p className="text-md font-bold">Rs.{selectedEvent.price}</p>
              </div>
              <hr className="border-slate-400 w-full my-2 md:hidden" />
              <div className="mb-5 flex justify-between items-center">
                <p className="text-md text-purple-900 font-bold">Quantity</p>
                <div className="flex items-center space-x-3 mt-3">
                  <button

                    onClick={handleDecrease}
                  >
                    <BiMinusCircle className='text-2xl'/>
                  </button>
                  <p className="text-lg font-semibold mr-2">{count}</p>
                  <button

                    onClick={handleIncrease}
                  >
                    <BiPlusCircle className='text-2xl'/>
                  </button>
                </div>
              </div>
              <hr className="border-slate-400 w-full my-2 md:hidden" />
              <div className="mb-5 flex justify-between items-center">
                <p className="text-md text-purple-900 font-bold">Apply Coupon</p>
                <input type="text" className="p-2 border border-slate-400 rounded-lg w-1/3" accept="" />
              </div>

              <hr className="border-slate-400 w-full my-2 md:hidden" />
              <div className="mb-5 flex justify-between items-center">
                <p className="text-md text-purple-900 font-bold">Total</p>
                <p className="text-md font-bold">Rs.{cartTotal}</p>
              </div>
              <hr className="border-slate-400 w-full my-2 md:hidden" />
              <div className="mb-5 flex justify-between items-center">
                <p className="text-md text-purple-900 font-bold">Action</p>
                <div className="text-white bg-red-500 rounded-full px-2 py-1 w-fit">
                <button className="text-md text-white font-bold hover:cursor-pointer" onClick={onDeleteEvent}>
                  <RiDeleteBinLine />
                </button>
              </div>
              </div>
              <hr className="border-slate-400 w-full my-2 md:hidden" />
            </div>
          </>
        ) : (
          <p className="text-md text-black font-normal">No items in cart.</p>
        )}
      </div>


      {/** Desktop View */}
      <div className="hidden md:flex md:flex-col md:justify-between md:items-center md:mb-5">
      <h2 className="text-xl text-purple-900 font-bold mb-2">Cart</h2>

        {selectedEvent ? (
          <> <div className='flex justify-start items-start border border-slate-500 p-5 rounded-lg w-full'>
            <div className="flex flex-col justify-between items-start w-1/3 space-y-3">
              <p className="text-md text-purple-900 font-bold">ITEMS</p>
              <img src={selectedEvent.image} alt="workshop" className="rounded-lg w-2/3 h-2/3" />
            </div>
            <div className='flex flex-col justify-between items-start w-2/3 space-y-10 x-full'>
            <div className="flex justify-between items-inline w-full">
              <div className="flex flex-col justify-between items-start">
                <p className="text-md text-purple-900 font-bold">Price</p>
                <p className="text-md font-bold">Rs.{selectedEvent.price}</p>
              </div>
              <div className="flex flex-col justify-between items-start">
                <p className="text-md text-purple-900 font-bold">Quantity</p>
                <div className="flex items-center space-x-3 mt-3">
                  <button
                    className="text-black font-bold py-2 px-4 rounded-full border border-black border-opacity-50 text-sm"
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <p className="text-lg font-semibold mr-2">{count}</p>
                  <button
                    className="text-black font-bold py-2 px-4 rounded-full border border-black border-opacity-50 text-sm"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>



              <hr className="border-slate-400 w-full my-2 md:hidden" />
              <div className="flex flex-col justify-between items-start">
                <p className="text-md text-purple-900 font-bold">Total</p>
                <p className="text-md font-bold">Rs.{cartTotal}</p>
              </div>
              <hr className="border-slate-400 w-full my-2 md:hidden" />
              <div className="flex flex-col justify-between items-start">
                <p className="text-md text-purple-900 font-bold">Action</p>
                <div className="text-white bg-red-500 rounded-full p-2 w-fit h-fit">
                  <p className="text-md text-white font-bold" onClick={onDeleteEvent}>
                    <RiDeleteBinLine />
                  </p>
                </div>
              </div>

            </div>
            <div className="flex justify-between space-x-3 items-center">
                <input type="text" className="p-2 border border-purple-900 rounded-lg " accept="" />
                <button className="text-md text-white py-2 px-3 bg-purple-900 font-bold rounded-lg">Apply Coupon</button>
            </div>
            </div>
            </div> </>
        ) : (
          <p className="text-md text-black font-normal">No items in cart.</p>
        )}
      </div>
    </>
  );
};
