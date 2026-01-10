import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../cart/CartContext';
import { GetUser } from '../user/UserContext';

const AddToCart = ({ product, isButton, isFinalCart }) => {

    const { isLogin } = GetUser();

    useEffect(() => {
        const initialQuantity = getQuentityFromLocalStorage();
        setLocalQuantity(initialQuantity || 1);
    }, [product]);

    const { incrementCart } = useCart();

    const getQuentityFromLocalStorage = () => {
        const cartitems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartitems && cartitems.length > 0 && product) {
            const existingItem = cartitems.find(item => item.id === product.id);
            return existingItem ? existingItem.quantity : 1;
        }
    }

    const onDecrementClick = () => {
        setLocalQuantity(prev => Math.max(0, prev - 1));
    };

    const onIncrementClick = () => {
        setLocalQuantity(prev => prev + 1);
    }

    const AddToCartList = () => {
        const ttl = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        const now = new Date();

        const productToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: localQuantity,
            img: product.imageName,
            expiry: now.getTime() + ttl,
        }
        incrementCart(productToAdd);
    }

    const [localQuantity, setLocalQuantity] = React.useState(getQuentityFromLocalStorage() || 1);

    const cartImage = () => {
        const ctItems = JSON.parse(localStorage.getItem('cartItems'));
        if (ctItems && ctItems.length > 0 && product) {
            const existingItem = ctItems.find(item => item.id === product.id);
            return existingItem ? 'ri-shopping-bag-fill' : 'ri-shopping-bag-line';
        }
        return 'ri-shopping-bag-line';
    };

    const handleClick = () => {

        if (!isLogin()) {
            return;
        }

        AddToCartList();

        toast.success("Product added to cart successfully!", {
            style: {
                width: '400px', // Inline style for a specific width
            },
        });
    };

    useEffect(()=>{
        if (isFinalCart) {
            AddToCartList();
        }
    },[localQuantity]);


    return (
        <>
            <div className='cart-quantity'>
             
             {isLogin() && <>
                <i className="quantity-btn ri-checkbox-indeterminate-fill ri-2x" onClick={localQuantity > 1 ? onDecrementClick : null}></i> 
                <span className="quantity-value">{localQuantity}</span>
                <i className="quantity-btn ri-add-box-fill ri-2x" onClick={onIncrementClick}></i>
          </>
          }
                {isButton &&
                    <button className="add-to-cart-btn" disabled={!isLogin()} onClick={() => {
                        handleClick();
                    }}>
                    <i className="ri-shopping-cart-line"></i> Add to Cart
                </button>
            }
            {!isButton && !isFinalCart &&
                <i className={`${cartImage()} cart-lg`} title='Add To Cart' onClick={() => {
                    handleClick();
                }}></i>
            }

              </div>
        </>
    )
};

export default AddToCart;