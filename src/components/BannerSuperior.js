import React, { useState, useContext } from 'react';
import logo from '../logo.png';
import './../css/BannerSuperior.css';
import { CartContext } from './CartContext';
import cartIcon from '../carrito.png';

function BannerSuperior({ setIsCartPanelOpen }) {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartPanelOpen] = useState(false);

  const handleCartIconClick = () => {
    setIsCartPanelOpen(prevIsCartPanelOpen => {
      const newIsCartPanelOpen = !prevIsCartPanelOpen;
      console.log('Cart icon clicked, isCartPanelOpen:', newIsCartPanelOpen);
      return newIsCartPanelOpen;
    });
  };

  const handleBannerClick = () => {
    window.location.reload();
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    console.log('Button clicked');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la acción de búsqueda usando la variable searchQuery
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="banner-superior">
      <div className="center-container">
        <img src={logo} alt="Logo de la empresa" className="logo" onClick={handleBannerClick} />
      </div>
      <button className="boton-derecha" onClick={handleButtonClick}>
        Menú
      </button>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Buscar..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <div className="cart-icon-container" onClick={handleCartIconClick}>
        <img src={cartIcon} alt="Carrito de compras" className="cart-icon" />
        {cart.length > 0 && (
          <div className="cart-count">
            {cart.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default BannerSuperior;
