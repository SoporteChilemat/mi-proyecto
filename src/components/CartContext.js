// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const newCart = [...prevCart, product];
            console.log('Product added to cart:', product);
            console.log('Current cart:', newCart);
            return newCart;
        });
    };

    const removeFromCart = (codigo) => {
        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.codigo === codigo);

            if (itemIndex === -1) {
                // no action needed if item not found
                return prevCart;
            }

            // remove the first item that matches the code
            return [...prevCart.slice(0, itemIndex), ...prevCart.slice(itemIndex + 1)];
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
