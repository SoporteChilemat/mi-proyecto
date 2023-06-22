import React from 'react';
import './../css/BannerInferior.css';
import logo from '../logo.png';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const SOCIAL_MEDIA_URLS = [
  { url: "https://www.facebook.com", icon: <FaFacebook />, alt: "Facebook" },
  { url: "https://www.twitter.com", icon: <FaTwitter />, alt: "Twitter" },
  { url: "https://www.instagram.com", icon: <FaInstagram />, alt: "Instagram" },
];

const ADDRESS_LIST = [
  { address: "Maturana 90, Villa Alemana.", mapsUrl: "https://www.google.cl/maps/place/Ferretería+Comercial+Francisco+Toso+ltda./@-33.0452045,-71.3770265,17z/data=!3m1!4b1!4m6!3m5!1s0x9689d78382b97efb:0x9678cc7254a6c0a8!8m2!3d-33.045209!4d-71.3744516!16s%2Fg%2F1td0zpk9?entry=ttu" },
  { address: "Manuel Montt 65, Peñablanca.", mapsUrl: "https://www.google.com/maps/place/Ferreter%C3%ADa+Francisco+Toso,+Chilemat/@-33.0490536,-71.3495041,15z/data=!4m2!3m1!1s0x0:0xa8d035123a4db83f?sa=X&ved=2ahUKEwio45vk_K7_AhUcKLkGHRUBASgQ_BJ6BAg1EAg" },
  { address: "Calle Colegio 1867, Olmue.", mapsUrl: "https://www.google.com/maps/place/Comercial+Toso+Limitada.+Chile+Mat/@-32.9983928,-71.1807687,15z/data=!4m2!3m1!1s0x0:0x541100152d291223?sa=X&ved=2ahUKEwi_jdD3_K7_AhUXB7kGHUyzD4UQ_BJ6BAg4EAg" },
  { address: "Barrio Industrial 701, Alto Peñuelas, Bodega E28, Coquimbo.", mapsUrl: "google.com/maps/place/NOTARIA+Del+Barrio+Industrial/@-29.9659208,-71.2708022,17z/data=!4m10!1m2!2m1!1sBarrio+Industrial+701,+Alto+Peñuelas,+Bodega+E28,+Coquimbo!3m6!1s0x9691cbeafad4c161:0x7cbfe43158fbb34a!8m2!3d-29.9659255!4d-71.2659313!15sCjtCYXJyaW8gSW5kdXN0cmlhbCA3MDEsIEFsdG8gUGXDsXVlbGFzLCBCb2RlZ2EgRTI4LCBDb3F1aW1ib5IBDW5vdGFyeV9wdWJsaWPgAQA!16s%2Fg%2F11h9ryqmwz?hl=es-ES&entry=ttu" },
];

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
            {ADDRESS_LIST.map(({ address, mapsUrl }) => (
              <li key={address}>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="blue-address">
                  {address}
                </a>
              </li>
            ))}
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