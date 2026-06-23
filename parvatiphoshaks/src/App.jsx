import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home.jsx';
import ProductDetails from './Pages/ProductDetails.jsx';
import Products from './Pages/Products.jsx';
import Register from './User/Register.jsx';
import Login from './User/Login.jsx';
import ForgetPassword from './User/ForgetPassword.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/user/userSlice.js';
import UserDashboard from './User/UserDashboard.jsx';
import Profile from './User/Profile.jsx';
import UpdateProfile from './User/UpdateProfile.jsx';
import UpdatePassword from './User/UpdatePassword.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ResetPassword from './User/ResetPassword.jsx';
import Cart from './cart/Cart.jsx';
import Shipping from './cart/Shipping.jsx';
import OrderConfirm from './cart/OrderConfirm.jsx';
import Payment from './cart/Payment.jsx';
import PaymentSuccess from './cart/PaymentSuccess.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch user on initial mount if authenticated via local storage
    if (localStorage.getItem('isAuthenticated') === 'true') {
      dispatch(loadUser());
    }
  }, [dispatch]);
  console.log('app level auth status', isAuthenticated);
  console.log('app level user data', user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/product/:id" element={<ProductDetails />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/user/register" element={<Register />}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route path="/user/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}></Route>
          <Route
            path="/profile/update"
            element={<ProtectedRoute element={<UpdateProfile />} />}
          ></Route>
          <Route
            path="/password/update"
            element={<ProtectedRoute element={<UpdatePassword />} />}
          ></Route>
          <Route path="/reset/:token" element={<ResetPassword />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />}></Route>
          <Route
            path="/order/confirm"
            element={<ProtectedRoute element={<OrderConfirm />} />}
          ></Route>
          <Route path="/process/payment" element={<ProtectedRoute element={<Payment />} />}></Route>
          <Route path="/success" element={<ProtectedRoute element={<PaymentSuccess />} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
