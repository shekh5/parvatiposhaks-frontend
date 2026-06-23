import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { PageTitle } from '../components/PageTitle.jsx';
import { updatePassword, loadUser, removeErrors, removeSuccess } from '../features/user/userSlice.js';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, loading } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error('Please fill in all fields', { position: 'top-center' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match', { position: 'top-center' });
      return;
    }

    const passwords = { oldPassword, newPassword, confirmNewPassword };
    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success('Password updated successfully', { position: 'top-center' });
      dispatch(loadUser());
      dispatch(removeSuccess());
      navigate('/profile');
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-sans">
      <PageTitle title="Update Password | Parvati Phoshaks" />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
        {loading ? <Loader /> : (
          <div className="max-w-xl w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-brand-blue">Security Settings</h2>
              <Link to="/profile" className="text-sm font-semibold text-gray-400 hover:text-brand-pink transition-colors">
                Cancel
              </Link>
            </div>

            <p className="text-gray-500 mb-8">Update your password to keep your account secure.</p>

            <form onSubmit={updatePasswordSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <hr className="border-gray-100" />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary text-lg flex justify-center items-center h-14 mt-8"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default UpdatePassword;
