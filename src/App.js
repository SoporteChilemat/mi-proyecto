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

  return (
    <div className="app">
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
        <BannerSuperior setIsCartPanelOpen={setIsCartPanelOpen} />
        <CartPanel isCartPanelOpen={isCartPanelOpen} setIsCartPanelOpen={setIsCartPanelOpen} />
        <PromotionCarousel />
        <ProductList />
        <BannerInferior />
      </CartProvider>
    </div>
  );
};

export default App;
