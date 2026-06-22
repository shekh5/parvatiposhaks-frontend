import '../UserStyles/Form.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice.js';
import { removeErrors } from '../features/user/userSlice.js';
import { removeSuccess } from '../features/user/userSlice.js';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/defaultAvatar.png');

  const { name, email, password, username } = user;
  const { success, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); //doubt: what is the useNavigate hook and how to use it? --- IGNORE ---

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!name || !email || !password || !username || !avatar) {
      toast.error('Please fill in all fields', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('username', username);
    myForm.set('avatar', avatar);
    console.log(myForm.entries());
    for (let pair of myForm.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    dispatch(registerUser(myForm));
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
      toast.success('Registration successful', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(removeSuccess());
      navigate('/user/login');
    }
  }, [dispatch, success, navigate]);

  return (
    <>
      <div className="form-container container">
        <div className="form-content">
          <form className="form" onSubmit={registerSubmit} encType="multipart/form-data">
            <h2>Sign-Up</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={registerDataChange}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div className="input-group avatar-group">
              <input
                type="file"
                name="avatar"
                className="file-input"
                onChange={registerDataChange}
              />
              <img src={avatarPreview} alt="avatar preview" className="avatar" />
            </div>
            <button className="authBtn">{loading ? 'Signing up...' : 'Sign-Up'}</button>
            <p className="form-links">
              Already have an account? <Link to="/user/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
