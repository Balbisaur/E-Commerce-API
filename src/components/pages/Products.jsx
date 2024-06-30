import React from 'react';
import ProductForm from '../components/Products/CreateProductForm';
import ProductList from '../components/Products/ProductList';
import ProductDetail from '../components/Products/ProductDetail';

const Products = () => {
  return (
    <div>
      <h2>Products</h2>
      <ProductForm />
      <ProductList />
      <ProductDetail />
    </div>
  );
};

export default Products;