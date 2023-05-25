import { useContext, useState } from 'react';
import { CartContext } from './CartContext';

const ProductItem = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { nombre, codigo, descripcion, precio, imagen } = product;
    const [isHovered, setIsHovered] = useState(false);

    const roundedPrice = Math.round(precio).toLocaleString();

    const handleClick = () => {
        addToCart(product);
    };

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`product-item ${isHovered ? 'hovered' : ''}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <img src={`data:image/jpeg;base64,${imagen}`} alt={nombre} />
            <h3>{nombre}</h3>
            <p>{codigo}</p>
            <p>{descripcion}</p>
            <p>Precio: ${roundedPrice}</p>
            <button onClick={handleClick}>Agregar a cotizar</button>
        </div>
    );
};

export default ProductItem;
