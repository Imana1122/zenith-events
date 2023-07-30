import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, resetCount } from '../../redux/countSlice';
import { Cart } from '../../components/cart-form/Cart';
import { OrderSummary } from '../../components/cart-form/OrderSummary';
import CustomerDetails from '../../components/cart-form/CustomerDetails';
import { useNavigate } from 'react-router';
import { PageComponent } from '../../components/pagelayouts/AdminLayoutComponent';

const CartForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the selectedEvent from the Redux store or set it to null if not available
  const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;

  // Get the count from the Redux store
  const count = useSelector((state) => state.count.count);

  // Check if the selectedEvent is available, otherwise navigate back to the home page
  useEffect(() => {
    if (!selectedEvent) {
      navigate('/');
    }
  });

  // Event handler for increasing the count
  const handleIncrease = (eventId) => {
    const serializableEventId = eventId.toString(); // Convert eventId to a string
    dispatch(increaseCount(serializableEventId));
  };

  // Event handler for decreasing the count
  const handleDecrease = (eventId) => {
    const serializableEventId = eventId.toString();
    dispatch(decreaseCount(serializableEventId));
  };

  // Calculate cart total, subtotal, VAT, and total
  const cartTotal = selectedEvent ? selectedEvent.price * count : 0;
  const VAT = 0.2; // Example VAT rate
  const subtotal = cartTotal;
  const total = subtotal + subtotal * VAT;

  return (
    <PageComponent>
      {/* Cart and Order Summary */}
      <div className="flex flex-col justify-start md:px-20 md:py-2 px-5">
        <Cart selectedEvent={selectedEvent} handleDecrease={handleDecrease} handleIncrease={handleIncrease} count={count} cartTotal={cartTotal} />

        {/* Order Summary */}
        <div className='md:hidden'>
          <OrderSummary VAT={VAT} subtotal={subtotal} cartTotal={cartTotal} total={total}/>
        </div>

        <div className='md:flex md:justify-between md:items-row md:space-x-10 hidden'>
          <OrderSummary VAT={VAT} subtotal={subtotal} cartTotal={cartTotal} total={total} />

          {/* Customer Details */}
          <CustomerDetails total={total} />
        </div>
      </div>
    </PageComponent>
  );
};

export default CartForm;
