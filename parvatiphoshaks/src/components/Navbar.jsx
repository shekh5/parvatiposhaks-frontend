import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserDashboard from '../User/UserDashboard.jsx';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className={`sticky w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-brand-light/95 backdrop-blur-md py-5 border-b border-gray-200'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl md:text-3xl font-serif font-bold text-brand-blue tracking-wider">
          Parvati <span className="text-brand-pink">Phoshaks</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-brand-blue hover:text-brand-pink font-medium transition-colors">Home</Link>
          <Link to="/products" className="text-brand-blue hover:text-brand-pink font-medium transition-colors">Products</Link>
          <Link to="/about" className="text-brand-blue hover:text-brand-pink font-medium transition-colors">About</Link>
          <Link to="/contact" className="text-brand-blue hover:text-brand-pink font-medium transition-colors">Contact</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          {/* Search Toggle */}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-brand-blue hover:text-brand-pink transition-colors">
            <SearchIcon />
          </button>

          {/* Cart */}
          <Link to="/cart" className="text-brand-blue hover:text-brand-pink transition-colors relative">
            <ShoppingCartIcon />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* User / Login */}
          {!isAuthenticated ? (
            <Link to="/user/login" className="text-brand-blue hover:text-brand-pink transition-colors hidden sm:block">
              <PersonAddIcon />
            </Link>
          ) : (
            <UserDashboard user={user} />
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-blue hover:text-brand-pink">
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      <div className={`absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${isSearchOpen ? 'max-h-24 border-t border-gray-100 py-4' : 'max-h-0'}`}>
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearchSubmit} className="flex relative max-w-3xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for traditional attire..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-gray-700"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-blue text-white rounded-full p-2 hover:bg-brand-pink transition-colors">
              <SearchIcon fontSize="small" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-brand-pink font-medium">Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-brand-pink font-medium">Products</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-brand-pink font-medium">About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-brand-pink font-medium">Contact</Link>
          {!isAuthenticated && (
            <Link to="/user/login" onClick={() => setIsMenuOpen(false)} className="text-brand-blue font-bold pt-4 border-t border-gray-100">Login / Register</Link>
          )}
        </div>
      )}
    </header>
  );
}
