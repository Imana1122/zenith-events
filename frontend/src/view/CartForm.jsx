import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, resetCount } from '../redux/countSlice';
import { Cart } from '../components/CartForm/Cart';
import { OrderSummary } from '../components/CartForm/OrderSummary';
import CustomerDetails from '../components/CartForm/CustomerDetails';
import {  selectEvent } from '../redux/eventSlice';
import {  useNavigate } from 'react-router';
import { PageComponent } from '../components/AdminLayoutComponent';
import axiosClient from '../axios';

const CartForm = () => {

 const navigate = useNavigate();
 const dispatch = useDispatch();

 const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;

 const count = useSelector((state) => state.count.count);


  useEffect(()=>{
    if(!selectedEvent){
        navigate('/')
      }
})


  const handleIncrease = (eventId) => {
    const serializableEventId = eventId.toString(); // Convert eventId to a string
    dispatch(increaseCount(serializableEventId));
  };

  const handleDecrease = (eventId) => {
    const serializableEventId = eventId.toString();
    dispatch(decreaseCount(serializableEventId));
  };



  const cartTotal = selectedEvent ? selectedEvent.price * count : 0;
  const VAT = 0.2; // Example VAT rate
  const subtotal = cartTotal;
  const total = subtotal + subtotal * VAT;


  return (
    <PageComponent>

      <div className="flex flex-col justify-start md:px-20 md:py-2 px-5">
        <Cart selectedEvent={selectedEvent} handleDecrease={handleDecrease} handleIncrease={handleIncrease} count={count} cartTotal={cartTotal} />


        <div className='md:hidden'>
        <OrderSummary VAT={VAT} subtotal={subtotal} cartTotal={cartTotal} total={total}/>
        </div>

        <div className='md:flex md:justify-between md:items-row md:space-x-10 hidden'>
        <OrderSummary VAT={VAT} subtotal={subtotal} cartTotal={cartTotal} total={total} />
        <CustomerDetails
        total={total}
      />
        </div>

      </div>
    </PageComponent>
  );
};

export default CartForm;
