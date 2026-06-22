import React, { useEffect } from 'react';
import '../CartStyles/OrderConfirm.css';
import { PageTitle } from '../components/PageTitle.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import CheckoutPath from './CheckoutPath.jsx';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingInfo || !shippingInfo.address) {
      navigate('/shipping');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [shippingInfo, cartItems, navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = subtotal > 1000 ? 0 : subtotal > 0 ? 100 : 0;
  const totalPrice = subtotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/process/payment');
  };

  // Render nothing if shipping info or cart items are empty before navigate completes
  if (!shippingInfo || !shippingInfo.address || cartItems.length === 0) {
    return null;
  }

  return (
    <>
      <PageTitle title="Confirm Order" />
      <Navbar />
      <CheckoutPath activeStep={1} />

      <div className="confirm-container">
        <h2 className="confirm-header">Confirm Your Order</h2>

        <div className="confirm-table-container">
          <table className="confirm-table">
            <caption>Shipping Info</caption>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{shippingInfo?.phoneNo}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.country} - ${shippingInfo?.pinCode}`}</td>
              </tr>
            </tbody>
          </table>

          <table className="confirm-table">
            <caption>Your Cart Items</caption>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product}>
                  <td>
                    <img src={item.image} alt={item.name} className="order-product-image" />
                  </td>
                  <td>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </td>
                  <td>
                    {item.quantity} x ₹{item.price} = <b>₹{item.quantity * item.price}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="confirm-table">
            <caption>Order Summary</caption>
            <tbody>
              <tr>
                <th>Subtotal</th>
                <td>₹{subtotal}</td>
              </tr>
              <tr>
                <th>Tax (18%)</th>
                <td>₹{tax}</td>
              </tr>
              <tr>
                <th>Shipping Charges</th>
                <td>{shippingCharges === 0 ? 'Free' : `₹${shippingCharges}`}</td>
              </tr>
              <tr>
                <th>Gross Total</th>
                <td>
                  <b>₹{totalPrice}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="proceed-button" onClick={proceedToPayment}>
          Proceed to Payment
        </button>
      </div>

      <Footer />
    </>
  );
};

export default OrderConfirm;
