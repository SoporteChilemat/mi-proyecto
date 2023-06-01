import React, { useState, useContext, useEffect, useRef } from 'react';
import logo from '../logo.png';
import './../css/BannerSuperior.css';
import { CartContext } from './CartContext';
import cartIcon from '../carrito.png';

const categories = [
  {
    id: 1,
    name: 'Categoria 1',
    subcategories: [
      { id: 1, name: 'Subcategoria 1' },
      { id: 2, name: 'Subcategoria 2' },
      { id: 1, name: 'Subcategoria 1' },
      { id: 2, name: 'Subcategoria 2' },
    ],
  },
  {
    id: 2,
    name: 'Categoria 2',
    subcategories: [
      { id: 3, name: 'Subcategoria 3 Subcategoria 3' },
      { id: 4, name: 'Subcategoria 4' },
      { id: 1, name: 'Subcategoria 1' },
      { id: 2, name: 'Subcategoria 2' },
      { id: 1, name: 'Subcategoria 1' },
      { id: 2, name: 'Subcategoria 2' },
    ],
  },
];

function BannerSuperior({ setIsCartPanelOpen, handleSearchSubmit }) {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const totalCartQuantity = Object.values(cart).reduce((total, product) => total + product.cantidad, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Nuevo estado para manejar si el menú está abierto
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const menuRef = useRef(null);
  const sumaTotal = Math.round(
    Object.values(cart).reduce((total, product) => {
      const totalProducto = Math.round(product.cantidad * product.precio);
      return total + totalProducto;
    }, 0)
  ).toLocaleString();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setSelectedCategory(null);
      }
    };

    const handleScroll = () => {
      setIsMenuOpen(false);
      setSelectedCategory(null);
    };

    document.addEventListener('click', handleClickOutside, true); // Agregar el evento de clic con el tercer parámetro "true" para capturar el evento en la fase de captura
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [setIsMenuOpen, setSelectedCategory]);

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

  const handleMenuButtonClick = () => {
    setIsMenuOpen(prevIsMenuOpen => {
      const newIsMenuOpen = !prevIsMenuOpen;
      if (!newIsMenuOpen) {
        setSelectedCategory(null); // Restablecer la categoría seleccionada al cerrar el menú
      }
      setShouldRenderMenu(newIsMenuOpen);
      return newIsMenuOpen;
    });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearchSubmit(searchQuery);
    setSearchQuery(''); // Clear the search query text after search
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category.id);
    }
  };
  
  return (
    <div className="banner-superior">
      <div className="center-container">
        <img src={logo} alt="Logo de la empresa" className="logo" onClick={handleBannerClick} />
      </div>
      <div className="menu-container" ref={menuRef}>
        <button className="boton-derecha" onClick={handleMenuButtonClick}>
          Categorias
        </button>
        {isMenuOpen && shouldRenderMenu && (
          <div className="menu">
            {categories.map(category => (
              <div
                key={category.id}
                className="menu-category button"
                onClick={() => handleCategoryClick(category)}
              >
                <span>
                  <h2>{category.name}</h2>
                </span>
                {selectedCategory === category.id && (
                  <div className="subcategory-container">
                    <ul>
                      {category.subcategories.map(subcategory => (
                        <li key={subcategory.id} className="menu-subcategory button">
                          {subcategory.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
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
      <div className="cart-icon-container" id="cart-icon-container" onClick={handleCartIconClick}>
        <div className="total-text">$ {sumaTotal}</div>
        <img src={cartIcon} alt="Carrito de compras" className="cart-icon" />
        {totalCartQuantity > 0 ? (
          <div className="cart-count">
            {totalCartQuantity}
          </div>
        ) : (
          <div className="cart-count">
            0
          </div>
        )}
      </div>
    </div>
  );
}

export default BannerSuperior;