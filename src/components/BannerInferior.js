// Banner.js
import React from 'react';
import './../css/BannerInferior.css';
import logo from '../logo.png';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const SOCIAL_MEDIA_URLS = [
  { url: "https://www.facebook.com", icon: <FaFacebook />, alt: "Facebook" },
  { url: "https://www.twitter.com", icon: <FaTwitter />, alt: "Twitter" },
  { url: "https://www.instagram.com", icon: <FaInstagram />, alt: "Instagram" },
];

const ADDRESS_LIST = ["Dirección 1", "Dirección 2", "Dirección 3", "Dirección 4"];

const BannerInferior = () => {
  const handleBannerClick = () => {
    window.location.reload();
  };

  return (
    <div className="bannerInferrior">
      <div className="content">
        <div className="information">
          <h2>Más información</h2>
          <p>Información adicional sobre nuestros productos y servicios.</p>
        </div>
        <div className="logos">
          <h2>Redes sociales</h2>
          <div className="social-icons">
            {SOCIAL_MEDIA_URLS.map(({ url, icon, alt }) => (
              <a href={url} className="social-icon" aria-label={alt} key={url}>
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="direcciones">
          <h2>Direcciones</h2>
          <ul className="address-list">
            {ADDRESS_LIST.map(address => <li key={address}>{address}</li>)}
          </ul>
        </div>
        <div className="logo-Inferior">
          <img src={logo} alt="Logo de la empresa" className="logoInferior" onClick={handleBannerClick} />
        </div>
      </div>
    </div>
  );
};

export default BannerInferior;