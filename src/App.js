import React, { useState } from 'react';
import ProductList from './components/ProductList';
import BannerSuperior from './components/BannerSuperior';
import BannerInferior from './components/BannerInferior';
import PromotionCarousel from './components/PromotionCarousel';
import { CartProvider } from './components/CartContext';
import CartPanel from './components/CartPanel';
import './css/styles.css';

const App = () => {
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    setSelectedCategory(category.categoria);
    setSelectedSubcategory(subcategory);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app" onTouchStart={handleTouchStart} style={{ userSelect: 'none' }}>
      {/* WhatsApp icon */}
      <a
        href="https://wa.me/56950061135"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
      {/* Resto del contenido */}

      <CartProvider>
        {/* <BannerSuperior
          setIsCartPanelOpen={setIsCartPanelOpen}
          handleSearchSubmit={handleSearchSubmit}
          handleSubcategoryClick={handleSubcategoryClick}
        /> */}
        {/* <CartPanel isCartPanelOpen={isCartPanelOpen} setIsCartPanelOpen={setIsCartPanelOpen} /> */}
        {/* <PromotionCarousel /> */}
         <ProductList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        /> 
         <BannerInferior />
      </CartProvider>
    </div>
  );
};

export default App;