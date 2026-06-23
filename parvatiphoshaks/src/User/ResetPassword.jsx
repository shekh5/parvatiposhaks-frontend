import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { PageTitle } from '../components/PageTitle.jsx';
import { resetPassword, removeErrors, removeSuccess } from '../features/user/userSlice.js';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector((state) => state.user);

  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmedPassword) {
      toast.error('Please fill in all fields', { position: 'top-center' });
      return;
    }

    if (password !== confirmedPassword) {
      toast.error('Passwords do not match', { position: 'top-center' });
      return;
    }

    const passwords = { password, confirmedPassword };
    dispatch(resetPassword({ token: token, passwords }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success('Password reset successfully', { position: 'top-center' });
      dispatch(removeSuccess());
      navigate('/user/login');
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="flex min-h-screen bg-brand-light font-sans">
      <PageTitle title="Create New Password | Parvati Phoshaks" />
      
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 bg-white shadow-2xl">
        
        {/* Back to Home */}
        <Link to="/" className="absolute top-8 left-8 md:left-16 lg:left-24 text-brand-blue font-semibold hover:text-brand-pink transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto mt-16 lg:mt-0">
          <h2 className="text-4xl font-serif font-bold text-brand-blue mb-2">Create New Password</h2>
          <p className="text-gray-500 mb-8">Enter your new password below.</p>

          <form onSubmit={resetPasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary text-lg flex justify-center items-center h-14 mt-8"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="mt-8 flex justify-center text-sm">
            <Link to="/user/login" className="font-semibold text-gray-500 hover:text-brand-pink transition-colors">
              Cancel & Return to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-brand-blue">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent z-10"></div>
        <img 
          src="/auth-bg.jpg" 
          alt="Luxury traditional wear" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-16 left-16 z-20 max-w-lg">
          <h1 className="text-5xl font-serif font-bold text-white mb-4 drop-shadow-md">Parvati Phoshaks</h1>
          <p className="text-xl text-white/90 font-light drop-shadow-md">Experience the elegance of authentic Indian traditional ethnic wear.</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
