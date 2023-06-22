// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    const updateQuantityInCart = (codigo, newQuantity) => {
        setCart(prevCart => {
            return {
                ...prevCart,
                [codigo]: { ...prevCart[codigo], cantidad: newQuantity },
            };
        });
    };

    const clearCart = () => {
        setCart({});
    };

    const incrementQuantity = (codigo) => {
        setCart(prevCart => {
            return {
                ...prevCart,
                [codigo]: { ...prevCart[codigo], cantidad: prevCart[codigo].cantidad + 1 },
            };
        });
    };

    const decrementQuantity = (codigo) => {
        setCart(prevCart => {
            return prevCart[codigo].cantidad > 1
                ? { ...prevCart, [codigo]: { ...prevCart[codigo], cantidad: prevCart[codigo].cantidad - 1 } }
                : prevCart;
        });
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            return prevCart[product.codigo]
                ? {
                    ...prevCart,
                    [product.codigo]: {
                        ...prevCart[product.codigo],
                        cantidad: prevCart[product.codigo].cantidad + 1,
                    },
                }
                : { ...prevCart, [product.codigo]: { ...product, cantidad: 1 } };
        });
    };

    const removeFromCart = (codigo) => {
        setCart(prevCart => {
            const { [codigo]: value, ...remainingCart } = prevCart;
            return remainingCart;
        });
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantityInCart, incrementQuantity, decrementQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
