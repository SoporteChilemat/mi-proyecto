import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './../css/PromotionCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PromotionCarousel = () => {
    const [images, setImages] = useState([]);
    const sliderRef = useRef(null); 
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        let interval;

        if (autoRotate) {
            interval = setInterval(() => {
                nextSlide();
            }, 10000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [autoRotate]);

    const nextSlide = () => {
        if (!autoRotate) {
            setAutoRotate(true);
        }
        sliderRef.current.slickNext();
    };

    const previousSlide = () => {
        if (!autoRotate) {
            setAutoRotate(true);
        }
        sliderRef.current.slickPrev();
    };

    const handleUserInteraction = () => {
        setAutoRotate(false);
    };


    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        const banner = document.querySelector('.banner-superior');
        const carouselContainer = document.querySelector('.carousel-container');
        const bannerHeight = banner.offsetHeight;
        carouselContainer.style.marginTop = `${bannerHeight}px`;
        // Actualizar la posición del carrusel cuando cambie el tamaño de la ventana
        const handleResize = () => {
            const newBannerHeight = banner.offsetHeight;
            carouselContainer.style.marginTop = `${newBannerHeight}px`;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://192.168.5.98:3000/api/promotionCarousel');
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <div className="carousel-container">
                <div className="carousel-buttons">
                    <button className="carousel-button" onClick={previousSlide}>
                        <span>&#8592;</span> {/* Flecha izquierda */}
                    </button>
                    <button className="carousel-button" onClick={nextSlide}>
                        <span>&#8594;</span> {/* Flecha derecha */}
                    </button>
                </div>
                <Slider ref={sliderRef} {...settings}>
                    {images.map((image, index) => (
                        <div key={index} className="slide-item">
                            <img src={`data:image;base64,${image}`} alt={`Promoción ${index + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default PromotionCarousel;
