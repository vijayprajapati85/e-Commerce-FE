import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cartCount, setCartCount] = useState(() => {
        let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return existingCartItems.length ? existingCartItems.length === 0 ? '': existingCartItems.length : ''; 
    });

    const incrementCart = (newItem) => {
        let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = existingCartItems.findIndex(item => item.id === newItem.id);
        if (existingItemIndex === -1) {
            existingCartItems.push(newItem);
            setCartCount(existingCartItems.length === 0 ? '' : existingCartItems.length);
        }
        else{
            existingCartItems[existingItemIndex].quantity = newItem.quantity;
        }
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
        setCartList(existingCartItems);
    }

    const [cartList, setCartList ] = useState(() =>{
     let items = JSON.parse(localStorage.getItem('cartItems')) || []; 
     return items;
    });

    const removeLocalItem = (removeData) =>{
      let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const updatedCartItems = existingCartItems.filter(item => item.id !== removeData.id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartList(updatedCartItems);
      setCartCount(updatedCartItems.length === 0 ? '' : updatedCartItems.length);
    }

      return (
    <CartContext.Provider value={{ cartCount, incrementCart, cartList, removeLocalItem }}>
      {children}
    </CartContext.Provider>
  );
};
