import '../UserStyles/UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/user/userSlice.js';
import { toast } from 'react-toastify';
import { useState } from 'react';

const UserDashboard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuVisible, setMenuVisible] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  if (!user) return null;

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  const cart = () => {
    navigate('/cart');
    console.log('cart clicked');
  };
  const orders = () => {
    navigate('/orders/user');
    console.log('orders clicked');
  };
  const profile = () => {
    navigate('/profile');
    console.log('profile clicked');
  };
  const logout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success('Logged out successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/user/login');
      })
      .catch((error) => {
        toast.error(error.message || 'Logout failed. Please try again.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const adminDashboard = () => {
    navigate('/admin/dashboard');
    console.log('admin dashboard clicked');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const options = [
    { name: `cart (${cartCount})`, funcName: cart },
    { name: 'orders', funcName: orders },
    { name: 'profile', funcName: profile },
    { name: 'logout', funcName: logout },
  ];

  if (user.role === 'admin') {
    options.unshift({
      name: 'admin dashboard',
      funcName: adminDashboard,
    });
  }

  return (
    <>
      <div className={`overlay ${menuVisible ? 'show' : ''}`}></div>
      <div className="dashboard-container">
        <div className="profile-header" onClick={toggleMenu}>
          <img
            src={user?.avatar?.url ? user.avatar.url : '/images/profile.png'}
            alt="User Avatar"
            className="profile-avatar"
          />
          <span className="profile-name"> {user.name || 'user'}</span>
          {menuVisible && (
            <div className="menu-options">
              {options.map((option, index) => (
                <button key={index} className="menu-option-btn" onClick={option.funcName}>
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
