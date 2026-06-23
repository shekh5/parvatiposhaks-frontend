import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader.jsx';
import { PageTitle } from '../components/PageTitle.jsx';
import { loadUser } from '../features/user/userSlice.js';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

const Profile = () => {
  const dispatch = useDispatch();
  const hasRequestedUser = useRef(false);
  const [profileLoadAttempted, setProfileLoadAttempted] = useState(false);
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (user || hasRequestedUser.current) return;
    hasRequestedUser.current = true;
    let isMounted = true;
    dispatch(loadUser()).finally(() => {
      if (isMounted) setProfileLoadAttempted(true);
    });
    return () => { isMounted = false; };
  }, [dispatch, user]);

  if (loading || (!user && !profileLoadAttempted)) return <Loader />;
  if (!isAuthenticated || !user) return <Navigate to="/user/login" replace />;

  const avatarUrl = user.avatar?.url || '/defaultAvatar.png';
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not available';

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-sans">
      <PageTitle title="My Profile | Parvati Phoshaks" />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header Banner */}
          <div className="h-32 bg-brand-blue w-full relative"></div>

          {/* Profile Content */}
          <div className="px-8 pb-12 relative">
            
            {/* Avatar Row */}
            <div className="flex justify-between items-end -mt-16 mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                  <img src={avatarUrl} alt="User Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <Link to="/profile/update" className="btn-outline px-6 py-2 rounded-full text-sm font-bold border-gray-300 text-gray-700 hover:border-brand-blue hover:text-brand-blue">
                Edit Profile
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left Col: Info */}
              <div className="md:col-span-1 space-y-6">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-brand-blue">{user.name}</h1>
                  <p className="text-gray-500">@{user.username || 'user'}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                    <p className="text-gray-800 font-medium break-all">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Role</p>
                    <p className="text-gray-800 font-medium capitalize">{user.role || 'User'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Joined</p>
                    <p className="text-gray-800 font-medium">{joinedDate}</p>
                  </div>
                </div>
              </div>

              {/* Right Col: Quick Actions */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Quick Actions</h3>
                
                <Link to="/orders/user" className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-brand-blue/5 transition-colors border border-transparent hover:border-brand-blue/20 group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-blue group-hover:scale-110 transition-transform">
                    📦
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">My Orders</h4>
                    <p className="text-sm text-gray-500">View and track your recent purchases</p>
                  </div>
                </Link>

                <Link to="/password/update" className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-brand-blue/5 transition-colors border border-transparent hover:border-brand-blue/20 group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-blue group-hover:scale-110 transition-transform">
                    🔒
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">Security Options</h4>
                    <p className="text-sm text-gray-500">Change your password and secure your account</p>
                  </div>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
