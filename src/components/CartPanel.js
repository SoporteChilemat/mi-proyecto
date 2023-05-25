import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import './../css/CartPanel.css';
import trashIcon from '../trash-can.png';

const CartPanel = ({ isCartPanelOpen }) => {
  const { cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const banner = document.querySelector('.banner-superior');
    const cartPanel = document.querySelector('.cart-panel');
    const bannerHeight = banner.offsetHeight;
    cartPanel.style.marginTop = `${bannerHeight}px`;
    const handleResize = () => {
      const newBannerHeight = banner.offsetHeight;
      cartPanel.style.marginTop = `${newBannerHeight}px`;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const groupedCart = cart.reduce((accumulator, product) => {
    if (accumulator[product.codigo]) {
      accumulator[product.codigo].cantidad += 1;
    } else {
      accumulator[product.codigo] = { ...product, cantidad: 1 };
    }
    return accumulator;
  }, {});

  const sumaTotal = Math.round(Object.values(groupedCart).reduce((total, product) => {
    const totalProducto = Math.round(product.cantidad * product.precio);
    return total + totalProducto;
  }, 0)).toLocaleString();

  const cartItems = Object.entries(groupedCart).map(([codigo, product]) => {
    const totalProducto = Math.round(product.cantidad * product.precio).toLocaleString();
    return (
      <div key={codigo} className="cart-panel-item">
        <img src={`data:image/jpeg;base64,${product.imagen}`} />
        <div className="separator">{product.nombre}</div>
        <div className="separator">Precio: ${Math.round(product.precio).toLocaleString()}</div>
        <div className="separator">Cantidad: {product.cantidad}</div>
        <div className="separator">Total: ${totalProducto}</div>
        <img src={trashIcon} alt="Eliminar" className="trash-icon" onClick={() => removeFromCart(codigo)} />
      </div>
    );
  });

  return (
    <div className={`cart-panel ${isCartPanelOpen ? 'open' : 'close'}`}>
      <h2>Cotización:</h2>
      {cartItems}
      <span className="total-label">Total General:</span> ${sumaTotal}
    </div>
  );
};

export default CartPanel;