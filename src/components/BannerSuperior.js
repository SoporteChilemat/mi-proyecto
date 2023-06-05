import React, { useState, useContext, useEffect, useRef } from 'react';
import logo from '../logo.png';
import './../css/BannerSuperior.css';
import { CartContext } from './CartContext';
import cartIcon from '../carrito.png';
import axios from 'axios';

function BannerSuperior({ setIsCartPanelOpen, handleSearchSubmit, handleSubcategoryClick }) {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const totalCartQuantity = Object.values(cart).reduce((total, product) => total + product.cantidad, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const menuRef = useRef(null);
  const sumaTotal = Math.round(
    Object.values(cart).reduce((total, product) => {
      const totalProducto = Math.round(product.cantidad * product.precio);
      return total + totalProducto;
    }, 0)
  ).toLocaleString();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const ipAddress = window.location.hostname;
        const response = await axios.get(`http://${ipAddress}:3000/api/categories`);
        const formattedCategories = formatCategories(response.data.categories);
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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

    document.addEventListener('click', handleClickOutside, true);
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
        setSelectedCategory(null);
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
    setSearchQuery('');
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category.categoria) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category.categoria);
    }
  };

  const handleSubmit2 = (category) => {
    handleSubcategoryClick(category);
  };

  const formatCategories = (categoriesData) => {
    const uniqueCategories = [...new Set(categoriesData.map(category => category.categoria))];
    const categoryMap = {};
    uniqueCategories.forEach(category => {
      categoryMap[category] = [];
    });
    categoriesData.forEach(category => {
      categoryMap[category.categoria].push(category.subcategoria);
    });
    return Object.keys(categoryMap).map(category => ({
      categoria: category,
      subcategorias: categoryMap[category]
    }));
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
                key={category.categoria}
                className="menu-category button"
                onClick={() => handleCategoryClick(category)}
              >
                <span>
                  <h2>{category.categoria}</h2>
                </span>
                {selectedCategory === category.categoria && (
                  <div className="subcategory-container">
                    <ul>
                      {category.subcategorias.map(subcategory => (
                        <li
                          key={subcategory}
                          className="menu-subcategory button"
                          onClick={() => handleSubmit2(category)}                        >
                          {subcategory}
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