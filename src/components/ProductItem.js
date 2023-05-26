import { useContext, useState } from 'react';
import { CartContext } from './CartContext';

const ProductItem = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { nombre, codigo, descripcion, precio, imagen } = product;
    const [isHovered, setIsHovered] = useState(false);
    const [quantity, setQuantity] = useState(1); // Nuevo estado para la cantidad

    const roundedPrice = Math.round(precio).toLocaleString();

    const handleClick = () => {
        // En lugar de agregar un producto, agrega la cantidad seleccionada
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    // Funciones para incrementar y decrementar la cantidad
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(Math.max(1, quantity - 1));
    };

    return (
        <div
            className={`product-item ${isHovered ? 'hovered' : ''}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <img src={`data:image/jpeg;base64,${imagen}`} alt={nombre} />
            <h3>{nombre}</h3>
            <p>Codigo: {codigo}</p>
            <p>{descripcion}</p>
            <p>$ {roundedPrice}</p>
            <div className="quantity" id="quantity-pack">
                <button className="quantity-decrement" onClick={decrementQuantity}>-</button>
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))}
                />
                <button className="quantity-increment" onClick={incrementQuantity}>+</button>
            </div>
            <button className="agregar" id="agregar-button" onClick={handleClick}>Agregar a cotizar</button>
        </div>
    );
};

export default ProductItem;
