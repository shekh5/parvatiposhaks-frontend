import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { PageTitle } from '../components/PageTitle.jsx';
import { updateProfile, loadUser, removeErrors, removeSuccess } from '../features/user/userSlice.js';
import Loader from '../components/Loader.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, success, loading } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '/defaultAvatar.png');

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
      toast.error('Please fill in all fields', { position: 'top-center' });
      return;
    }

    const userData = { name, email };
    if (avatar) userData.avatar = avatar;

    dispatch(updateProfile(userData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success('Profile updated successfully', { position: 'top-center' });
      dispatch(loadUser());
      dispatch(removeSuccess());
      navigate('/profile');
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-sans">
      <PageTitle title="Update Profile | Parvati Phoshaks" />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
        {loading ? <Loader /> : (
          <div className="max-w-xl w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-brand-blue">Update Profile</h2>
              <Link to="/profile" className="text-sm font-semibold text-gray-400 hover:text-brand-pink transition-colors">
                Cancel
              </Link>
            </div>

            <form onSubmit={updateProfileSubmit} className="space-y-6" encType="multipart/form-data">
              
              {/* Avatar Upload */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative group cursor-pointer">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-brand-blue text-white p-2 rounded-full cursor-pointer hover:bg-brand-pink transition-colors shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <input type="file" name="avatar" className="hidden" accept="image/*" onChange={updateProfileDataChange} />
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-3 font-medium uppercase tracking-widest">Change Photo</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary text-lg flex justify-center items-center h-14 mt-8"
              >
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default UpdateProfile;
