import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserMenu, AdminMenu } from './menu'
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/CartContext';
import { GetUser } from '../../user/UserContext';
import CartDetail from '../../cart/CartDetail';
import { useState } from 'react';

const Navbar = ({ isAdmin }) => {

    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { isLogin, getProfile } = GetUser();

    const cartitems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartitems && cartitems.length > 0) {
        const latestExpiryTimestamp = Math.max(...cartitems.map(item => item.expiry));

        const now = new Date();

        // Check if the current time is beyond the expiry time
        if (now.getTime() > latestExpiryTimestamp) {
            localStorage.removeItem('cartItems');
        }
    }

    const [products, setProducts] = useState(cartitems);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const profile =  getProfile();
    const handleCartClick = () => {
        if (!isLogin()) {
            navigate('login');
        }
        else{
            setIsCartOpen(true);
        }
    };

    const handleLoginClick = () => {
        if (!isLogin()) {
            navigate('login');
        }
        else
        {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from storage
        localStorage.removeItem('profile');
        setIsMenuOpen(false); // Close the menu
        navigate('/login'); // Redirect to the login page
    };

    return (
        <>
            <header className="site-header">
                <div className="header-container">

                    <div className="logo-container">
                        {/* Use your actual logo image or text here */}
                        <Link to="/" className="site-logo">
                            <i className="ri-shopping-bag-line"></i>
                            eCommerce Shop
                        </Link>
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="Search products..." />
                        <button className="search-button">
                            <i className="ri-search-line"></i>
                        </button>
                    </div>
                    <div style={{ display: isAdmin ? 'none' : 'flex' }}>
                        <div onClick={handleCartClick}>
                            <i className={`${cartCount ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"} ri-lg`}></i>
                            <span className="cart-count">{cartCount}</span>
                        </div>
                        <div style={{ padding: "0px 25px" }} onClick={handleLoginClick}>
                            <div className="user-profile-area">
                                <i className={`${isLogin() ? "ri-user-fill" : "ri-user-line"} ri-lg`}></i>
                                {isMenuOpen && profile && (
                                    <div className="user-dropdown-menu">
                                        <p>Welcome, {`${profile.fullName}`}!</p>
                                        <p>Email: {`${profile.emailId}`}</p>
                                        <a onClick={handleLogout}>Logout</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {isAdmin ? <AdminMenu /> : <UserMenu />}
            {isCartOpen && (
                <CartDetail
                    onClose={handleCloseCart}
                    products={products}
                />
            )}
        </>
    )
}
export default Navbar;