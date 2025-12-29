import './Navbar.css';
import { UserMenu, AdminMenu } from './menu'
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/CartContext';
import  CartDetail  from '../../cart/CartDetail';
import { useState } from 'react';

const Navbar = ({isAdmin}) => {
 
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

                    <div className="cart-icon" style={{ display: isAdmin ? 'none' : 'block' }} onClick={handleCartClick}>
                            <i className={`${cartCount ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"} cart-lg`}></i>
                            <span className="cart-count">{cartCount}</span>
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