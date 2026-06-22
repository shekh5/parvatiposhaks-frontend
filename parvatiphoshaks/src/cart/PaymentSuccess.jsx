import React from 'react';
import '../CartStyles/PaymentSuccess.css';
import { Link } from 'react-router-dom';
import { PageTitle } from '../components/PageTitle.jsx';

const PaymentSuccess = () => {
  return (
    <>
      <PageTitle title="Order Successful" />
      <div className="payment-success-container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark"></div>
          </div>
          <h1>Your Order has been Placed Successfully!</h1>
          <p className="success-para">
            Thank you for shopping with Parvati Phoshaks. We will process your order soon.
          </p>
          <Link to="/products" className="explore-btn">
            Explore More Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
