import React from 'react';
import ProductItem from '../ProductItem';
import './ProductList.style.css';

const ProductList = ({ products, balance, onBuy, onSell }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          balance={balance}
          onBuy={onBuy}
          onSell={onSell}
        />
      ))}
    </div>
  );
};

export default ProductList;