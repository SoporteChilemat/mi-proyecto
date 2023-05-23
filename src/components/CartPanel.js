import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './../css/CartPanel.css';

const CartPanel = ({ isCartPanelOpen }) => {
  const { cart } = useContext(CartContext);

  return (
    <div className={`cart-panel ${isCartPanelOpen ? 'open' : 'close'}`}>
      <h2>Cotizacion:</h2>
      {cart.map((product, index) => (
        <div key={index} className="cart-panel-item">
          <img src={`data:image/jpeg;base64,${product.imagen}`} />
          <div>{product.nombre}</div>
          <div>{product.precio}</div>
        </div>
      ))}
    </div>
  );
};

export default CartPanel;