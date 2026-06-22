import React, { useEffect, useState } from 'react';
import '../CartStyles/Payment.css';
import { PageTitle } from '../components/PageTitle.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import CheckoutPath from './CheckoutPath.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader.jsx';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const orderInfo = sessionStorage.getItem('orderInfo')
    ? JSON.parse(sessionStorage.getItem('orderInfo'))
    : null;

  useEffect(() => {
    if (!shippingInfo || !shippingInfo.address) {
      navigate('/shipping');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    } else if (!orderInfo) {
      navigate('/order/confirm');
    }
  }, [shippingInfo, cartItems, orderInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = {
        shippingInfo,
        orderItems: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          product: item.product,
        })),
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
        paymentInfo: {
          id: 'mock_pay_' + Date.now(),
          status: 'succeeded',
        },
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/v1/order/create', order, config);

      if (data.message === 'Order created successfully' || data.order) {
        toast.success('Order Placed Successfully', {
          position: 'top-center',
          autoClose: 3000,
        });
        dispatch(clearCart());
        sessionStorage.removeItem('orderInfo');
        navigate('/success');
      } else {
        toast.error('Failed to create order. Please try again.', {
          position: 'top-center',
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Payment" />
      <Navbar />
      <CheckoutPath activeStep={2} />

      <div className="payment-container">
        <div>
          <h3>Mock Payment Flow</h3>
        </div>
        <div>
          <button className="payment-go-back" onClick={() => navigate('/order/confirm')}>
            Go Back
          </button>
          <button className="payment-btn" onClick={submitHandler}>
            Pay ₹{orderInfo?.totalPrice}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
