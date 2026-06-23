import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, removeErrors, removeSuccess } from '../features/user/userSlice.js';
import { PageTitle } from '../components/PageTitle.jsx';

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
  const navigate = useNavigate();

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
    if (!name || !email || !password || !username || !avatar) {
      toast.error('Please fill in all fields', { position: 'top-center' });
      return;
    }

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('username', username);
    myForm.set('avatar', avatar);
    dispatch(registerUser(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success('Registration successful', { position: 'top-center' });
      dispatch(removeSuccess());
      navigate('/user/login');
    }
  }, [dispatch, success, navigate]);

  return (
    <div className="flex min-h-screen bg-brand-light font-sans">
      <PageTitle title="Sign Up | Parvati Phoshaks" />
      
      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 bg-white shadow-2xl py-12 lg:py-0">
        
        {/* Back to Home */}
        <Link to="/" className="absolute top-8 left-8 md:left-16 lg:left-24 text-brand-blue font-semibold hover:text-brand-pink transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto mt-12 lg:mt-0">
          <h2 className="text-4xl font-serif font-bold text-brand-blue mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8">Join us to shop premium traditional wear.</p>

          <form onSubmit={registerSubmit} className="space-y-5" encType="multipart/form-data">
            
            {/* Avatar Upload */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                  <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                </div>
                <label className="absolute bottom-0 right-0 bg-brand-blue text-white p-2 rounded-full cursor-pointer hover:bg-brand-pink transition-colors shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <input type="file" name="avatar" className="hidden" accept="image/*" onChange={registerDataChange} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                  value={name}
                  onChange={registerDataChange}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                  value={username}
                  onChange={registerDataChange}
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                value={email}
                onChange={registerDataChange}
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 transition-colors"
                value={password}
                onChange={registerDataChange}
                placeholder="Create a password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary text-lg flex justify-center items-center h-14 mt-4"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/user/login" className="font-semibold text-brand-blue hover:text-brand-pink transition-colors">
              Log in here
            </Link>
          </p>
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
          <p className="text-xl text-white/90 font-light drop-shadow-md">Join our community and explore authentic Indian fashion.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
