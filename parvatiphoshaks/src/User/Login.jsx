import '../UserStyles/Form.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice.js';
import { removeErrors } from '../features/user/userSlice.js';
import { removeSuccess } from '../features/user/userSlice.js';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { error, success, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: loginEmail, password: loginPassword }));
    // Handle form submission logic here
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

  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, redirect]);

  useEffect(() => {
    if (success) {
      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);
  // }, [dispatch, success]) --- IGNORE ---

  return (
    <>
      <div className="form-container container">
        <div className="form-content">
          <form className="form" onSubmit={loginSubmit}>
            <h2 className="form-title">Sign-In</h2>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                required
                className="form-input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                required
                className="form-input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button className="authBtn">Login</button>
            <p className="form-links">
              Forgat your password?
              <Link to="/user/forgot-password" className="form-link">
                Reset Here
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
    </>
  );
};

export default Login;
