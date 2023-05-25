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
    // Actualizar la posición del panel del carrito cuando cambie el tamaño de la ventana
    const handleResize = () => {
      const newBannerHeight = banner.offsetHeight;
      cartPanel.style.marginTop = `${newBannerHeight}px`;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Agrupar y sumar las cantidades de productos con el mismo código
  const groupedCart = cart.reduce((accumulator, product) => {
    if (accumulator[product.codigo]) {
      accumulator[product.codigo].cantidad += 1;
    } else {
      accumulator[product.codigo] = { ...product, cantidad: 1 };
    }
    return accumulator;
  }, {});

  // Calcular la suma total de todos los productos en el carrito
  const sumaTotal = Object.values(groupedCart).reduce((total, product) => {
    const totalProducto = product.cantidad * product.precio;
    return total + totalProducto;
  }, 0);

  // Renderizar los elementos del carrito actualizados con las cantidades sumadas y el total de cada producto
  const cartItems = Object.entries(groupedCart).map(([codigo, product]) => {
    const totalProducto = product.cantidad * product.precio;
    return (
      <div key={codigo} className="cart-panel-item">
        <img src={`data:image/jpeg;base64,${product.imagen}`} />
        <div className="separator">{product.nombre}</div>
        <div className="separator">Precio: {product.precio}</div>
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
