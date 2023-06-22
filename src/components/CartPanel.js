import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import './../css/CartPanel.css';
import trashIcon from '../trash-can.png';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const CartPanel = ({ isCartPanelOpen, setIsCartPanelOpen }) => {
  const { cart, removeFromCart, updateQuantityInCart, incrementQuantity, decrementQuantity, clearCart } = useContext(CartContext);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Ignore clicks on the cart icon
      if (e.target.closest('#cart-icon-container')) {
        return;
      }

      if (e.target.closest('#agregar-button')) {
        return;
      }

      if (e.target.closest('#pagination-buttons-top')) {
        return;
      }

      if (e.target.closest('#pagination-buttons-bottom')) {
        return;
      }

      if (e.target.closest('#quantity-pack')) {
        return;
      }

      if (!e.target.closest('.cart-panel')) {
        setIsCartPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsCartPanelOpen]);

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

  const sumaTotal = Math.round(
    Object.values(cart).reduce((total, product) => {
      const totalProducto = Math.round(product.cantidad * product.precio);
      return total + totalProducto;
    }, 0)
  ).toLocaleString();


  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["Nombre", "Código", "Descripción", "Cantidad", "Total"];
    const tableRows = [];

    Object.entries(cart).forEach(([codigo, product]) => {
      const productData = [
        product.nombre,
        codigo,
        product.descripcion, // Assuming this field exists
        product.cantidad,
        Math.round(product.cantidad * product.precio).toLocaleString(),
      ];
      tableRows.push(productData);
    });

    doc.autoTable(tableColumns, tableRows, { startY: 20 });

    const finalY = doc.previousAutoTable.finalY; // Get the y position of the last element
    doc.text(`Total General: $${sumaTotal}`, 14, finalY + 20);

    doc.save("cotizacion.pdf");
  };

  const handleClearCart = () => {
    clearCart();
  };

  const cartItems = Object.entries(cart).map(([codigo, product]) => {
    const totalProducto = Math.round(product.cantidad * product.precio).toLocaleString();

    const handleRemoveFromCart = () => {
      const cartItem = document.getElementById(`cart-item-${codigo}`);
      cartItem.classList.add('cart-item-remove');
      setTimeout(() => {
        removeFromCart(codigo);
      }, 500); // Espera 500ms antes de eliminar definitivamente el elemento del carrito
    };

    return (
      <div key={codigo} id={`cart-item-${codigo}`} className="cart-panel-item card">
        <div className="cart-item-left">
          <img src={`data:image/jpeg;base64,${product.imagen}`} className="cart-item-image" />
        </div>
        <div className="cart-item-right">
          <div className="cart-item-name">{product.nombre}</div>
          <div className="cart-item-price">Precio: ${Math.round(product.precio).toLocaleString()}</div>
          <div className="quantity" id="quantity-pack">
            <button className="quantity-decrement" onClick={() => decrementQuantity(product.codigo)}>-</button>
            <input
              type="number"
              value={product.cantidad}
              onChange={(e) => {
                let newQuantity = parseInt(e.target.value);
                if (isNaN(newQuantity) || newQuantity < 1) {
                  newQuantity = 1;
                }
                updateQuantityInCart(codigo, newQuantity);
              }}
            />
            <button className="quantity-increment" onClick={() => incrementQuantity(product.codigo)}>+</button>
          </div>
          <div className="cart-item-total">Total: ${totalProducto}</div>
          <img src={trashIcon} alt="Eliminar" className="trash-icon" onClick={handleRemoveFromCart} />
        </div>
      </div>
    );
  });

  return (
    <div className={`cart-panel ${isCartPanelOpen ? 'open' : 'close'}`}>
      <button className="clear-cart" onClick={handleClearCart}>Vaciar Carrito</button>
      <h2>Cotización</h2>
      {cartItems}
      <span className="total-label">Total General: </span>
      <span className="suma-total"> $ {sumaTotal}</span>
      <button className="pdf" onClick={generatePDF}>Generar Cotización</button>
    </div>
  );
};

export default CartPanel;