import '../UserStyles/Form.css';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, removeSuccess } from '../features/user/userSlice.js';
import { removeErrors } from '../features/user/userSlice.js';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import { Message } from '@mui/icons-material';
import Loader from '../components/Loader.jsx';

const ForgetPassword = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const { error, success, loading, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const forgotSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email: loginEmail }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
      Navigate('/profile');
    }
  }, [dispatch, success, message]);

  return (
    <>
      <Navbar />
      <div className="form-container container">
        <div className="form-content">
          <form className="form" onSubmit={forgotSubmit}>
            <h2 className="form-title">forgot password</h2>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="form-input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <button className="authBtn">{loading ? 'Sending' : 'Send'}</button>
            <p className="form-links">
              login?
              <Link to="/user/login" className="form-link">
                login
              </Link>
            </p>
            <p className="form-links">
              Don't have an account?{' '}
              <Link to="/user/register" className="form-link">
                Sign-Up Here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgetPassword;
