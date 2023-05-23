import { useContext } from 'react';
import { CartContext } from './CartContext';

const ProductItem = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { nombre, codigo, descripcion, precio, imagen } = product;

    const handleClick = () => {
        addToCart(product);
    };

    return (
        <div className="product-item">
            <img src={`data:image/jpeg;base64,${imagen}`} alt={nombre} />
            <h3>{nombre}</h3>
            <p>{codigo}</p>
            <p>{descripcion}</p>
            <p>Precio: ${precio}</p>
            <button onClick={handleClick}>Agregar a cotizar</button>
        </div>
    );
};

export default ProductItem;