import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const PlaceOrderForm = () => {
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3306/products');
        setProducts(response.data);
      } catch (error) {
        setError('There was an error fetching the products!');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3306/orders', {
        customerId,
        products: selectedProducts
      });
      alert('Order placed successfully');
    } catch (error) {
      console.error('There was an error placing the order!', error);
      setError('There was an error placing the order!');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCustomerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formProducts">
        <Form.Label>Select Products</Form.Label>
        {products.map((product) => (
          <Form.Check
            type="checkbox"
            key={product.id}
            label={`${product.name} - $${product.price}`}
            value={product.id}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setSelectedProducts((prev) =>
                e.target.checked ? [...prev, value] : prev.filter((id) => id !== value)
              );
            }}
          />
        ))}
      </Form.Group>
      <Button variant="primary" type="submit">Place Order</Button>
    </Form>
  );
};

export default PlaceOrderForm;
