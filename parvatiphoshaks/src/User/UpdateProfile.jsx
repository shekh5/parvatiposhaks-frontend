import '../UserStyles/Form.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { PageTitle } from '../components/PageTitle.jsx';
import {
  updateProfile,
  loadUser,
  removeErrors,
  removeSuccess,
} from '../features/user/userSlice.js';
import Loader from '../components/Loader.jsx';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, success, loading } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '/images/profile.png');

  const updateProfileDataChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
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

    const userData = {
      name,
      email,
    };

    if (avatar) {
      userData.avatar = avatar;
    }

    dispatch(updateProfile(userData));
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

    if (success) {
      toast.success('Profile updated successfully', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(loadUser());
      dispatch(removeSuccess());
      navigate('/profile');
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Update Profile" />
          <div className="form-container container">
            <div className="form-content">
              <form className="form" onSubmit={updateProfileSubmit} encType="multipart/form-data">
                <h2>Update Profile</h2>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group avatar-group">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="file-input"
                    onChange={updateProfileDataChange}
                  />
                  <img src={avatarPreview} alt="avatar preview" className="avatar" />
                </div>
                <button className="authBtn" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
                <p className="form-links">
                  <Link to="/profile">Cancel</Link>
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
