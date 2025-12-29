import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../cart/CartContext';

const AddToCart = ({ product, isButton, isFinalCart }) => {

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

    const onIncrementClick = () =>
    {
            setLocalQuantity(prev => Math.max(0, prev - 1));

       
    };

    const onDecrementClick = () =>
    {
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
        // const ttl = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        // const now = new Date();

        // const productToAdd = {
        //     id: product.id,
        //     name: product.name,
        //     price: product.price,
        //     quantity: localQuantity,
        //     img:product.imageName,
        //     expiry: now.getTime() + ttl,
        // }
        // incrementCart(productToAdd);

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
                <button className="quantity-btn" disabled={localQuantity <= 1} onClick={onIncrementClick}>-</button>
                <span className="quantity-value">{localQuantity}</span>
                <button className="quantity-btn" onClick={onDecrementClick}>+</button>
          
            {isButton &&
                <button className="add-to-cart-btn" onClick={() => {
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