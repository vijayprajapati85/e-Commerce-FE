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

    // const [products, setProducts] = useState(cartitems);
    // const [adminMenu, setAdminMenu] = useState(isAdmin);
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
            if (!isAdmin) {
                navigate('login');
            }
            else {
                navigate('/admin/login');
            }
        }
        else
        {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };


     const clearSession = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        localStorage.removeItem('cartItems');
    };

     const clearAdminSession = () => {
        localStorage.removeItem('tokenentry');
        localStorage.removeItem('profileentry');
    };

    const handleLogout = () => {
        
        if (!isAdmin) {
            clearSession();
            navigate('/login');
        }
        else {
            clearAdminSession();
            navigate('/admin/login');
        }
        setIsMenuOpen(false);
    };

    useState(() => {
        if (isAdmin) {
            clearSession();
        }
        else {
            clearAdminSession();
        }
        //setAdminMenu(isAdmin);
    }, [isAdmin]);

    return (
        <>
            <header className="site-header">
                <div className="header-container">

                    <div className="logo-container">
                        {/* Use your actual logo image or text here */}
                        <Link to="/" className="site-logo">
                            <i className="ri-shopping-bag-line"></i>
                            Jiyazon Shop
                        </Link>
                    </div>

                    <div className="search-bar">
                        <input type="text" id='searchproduct' name='search' placeholder="Search products..." />
                        <button className="search-button">
                            <i className="ri-search-line"></i>
                        </button>
                    </div>
                    <div className='headercart-icon' style={{ display: isAdmin ? 'none' : '' }} onClick={handleCartClick}>
                        <i className={`${cartCount ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"} ri-lg`}></i>
                        <span className={`${cartCount ? "cart-count" : ""}`}>{cartCount}</span>
                    </div>
                    <div className='account-icon' onClick={handleLoginClick}>
                        <div className="user-profile-area">
                            <i className={`${isLogin() ? "ri-user-fill" : "ri-user-line"} ri-lg`}></i>
                            {isMenuOpen && profile && (
                                <div className="user-dropdown-menu">
                                    <p>Welcome, {`${profile.fullName}`}!</p>
                                    <p>Email: {`${profile.emailId}`}</p>
                                    {!isAdmin && (<p><Link to="/orderdetail">Track Order</Link></p>)}
                                    <a onClick={handleLogout}>Logout</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {isAdmin ? <AdminMenu /> : <UserMenu />}
            {isCartOpen && (
                <CartDetail
                    onClose={handleCloseCart}
                    products={cartitems}
                />
            )}
        </>
    )
}
export default Navbar;