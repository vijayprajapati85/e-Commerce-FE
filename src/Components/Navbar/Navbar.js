import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserMenu, AdminMenu } from './menu'
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/CartContext';
import  CartDetail  from '../../cart/CartDetail';
import { useState } from 'react';

const Navbar = ({isAdmin}) => {
 
    const navigate = useNavigate();
    const { cartCount } = useCart();
    
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

    const handleCartClick = () => {
        setIsCartOpen(true);
    };

    const handleLoginClick = () => {
        navigate('login');
    };

     const handleCloseCart = () => {
    setIsCartOpen(false);
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
                        <div className="cart-icon" onClick={handleCartClick}>
                            <i className={`${cartCount ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"} ri-lg`}></i>
                            <span className="cart-count">{cartCount}</span>
                        </div>
                        <div className="cart-icon" style={{padding: "0px 25px"}} onClick={handleLoginClick}><i class="ri-user-line ri-lg"></i></div>
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