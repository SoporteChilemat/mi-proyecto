import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import './../css/ProductList.css';
import './../css/ProductItem.css';

const ProductList = ({ searchQuery, setSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOption, setSortOption] = useState({ field: '', order: '' });
  const pageSize = 20;

  useEffect(() => {
    fetchProducts();
  }, [page, sortOption, searchQuery]);

  const fetchProducts = async () => {
    try {
      const ipAddress = window.location.hostname;
      let url = `http://${ipAddress}:3000/api/products?page=${page}&sort=${sortOption.field}&order=${sortOption.order}`;
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTotalCount(data.totalCount);
        setProducts(data.products);
      } else {
        console.error('Error fetching products:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const canGoNext = () => page < Math.ceil(totalCount / pageSize);
  const canGoPrev = () => page > 1;

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === '') {
      setSortOption({ field: '', order: '' });
    } else {
      const [field, order] = value.split("-");
      setSortOption({ field, order });
    }
  };

  return (
    <div className="product-list-container">
      <div class="pagination-and-sort">
        <div className="sort-dropdown">
          <select value={`${sortOption.field}-${sortOption.order}`} onChange={handleSortChange}>
            <option value="">Ordenar Por...</option>
            <option value="price-asc">Precio (Ascendente)</option>
            <option value="price-desc">Precio (Descendente)</option>
            <option value="name-asc">Nombre (Ascendente)</option>
            <option value="name-desc">Nombre (Descendente)</option>
            <option value="code-asc">Codigo (Ascendente)</option>
            <option value="code-desc">Codigo (Descendente)</option>
          </select>
        </div>
        <div class="pagination-buttons pagination-buttons-top" id="pagination-buttons-top">
          <button disabled={!canGoPrev()} onClick={() => setPage(prevPage => prevPage - 1)}>
            Atras
          </button>
          <button disabled={!canGoNext()} onClick={() => setPage(prevPage => prevPage + 1)}>
            Siguiente
          </button>
        </div>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination-buttons pagination-buttons-bottom" id="pagination-buttons-bottom">
        <button disabled={!canGoPrev()} onClick={() => setPage(prevPage => prevPage - 1)}>
          Previous
        </button>
        <button disabled={!canGoNext()} onClick={() => setPage(prevPage => prevPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;