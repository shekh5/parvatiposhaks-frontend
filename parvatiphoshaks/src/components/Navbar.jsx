import { Link, useNavigate } from "react-router-dom"
import "../componentStyles/Navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import "../pageStyles/Search.css"
import { useSelector } from "react-redux";



export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    const toogleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const {isAuthenticated} = useSelector((state) => state.user); // Replace with actual authentication logic
    const { cartItems } = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            navigate(`/products`)
        }
        setSearchQuery("")
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <Link to="/" onClick={() => {
                            setIsMenuOpen(false);
                        }}>Parvati Poshaks</Link>
                    </div>
                    <div className={`navbar-links ${isMenuOpen ? "active" : "false"}`}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="navbar-icons">
                        <div className="search-container">
                            <form action="" className={`search-form ${isSearchOpen ? "active" : "false"}`} onSubmit={handleSearchSubmit}>
                                <input type="text" className="search-input" placeholder="Search-product.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                <button type="button" className="search-icon" onClick={toogleSearch}><SearchIcon focusable="false" /></button>
                            </form>
                        </div>

                        <div className="cart-container">
                            <Link to="/cart"><ShoppingCartIcon className="icon" /></Link>
                            <span className="cart-badge">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                        </div>

                        {!isAuthenticated && (
                            <Link to="/user/register" className="register-link">
                                <PersonAddIcon className="icon" />
                            </Link>
                        )}

                        <div className="navbar-hamburger" onClick={toggleMenu}>

                            {isMenuOpen ? <CloseIcon className='icon' /> : <MenuIcon className='icon' />}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}