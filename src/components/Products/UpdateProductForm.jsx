import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateProductForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/products/${id}`);
        const { name, price } = response.data;
        setName(name);
        setPrice(price);
      } catch (error) {
        setError('There was an error fetching the product details!');
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate price as a number
      if (isNaN(parseFloat(price))) {
        throw new Error('Price must be a valid number');
      }

      await axios.put(`http://localhost:3306/products/${id}`, { name, price });
      alert('Product updated successfully');
      // Optionally: Redirect to another page after successful update
      history.push('/products');
    } catch (error) {
      console.error('There was an error updating the product!', error);
      setError('There was an error updating the product!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">Update Product</Button>
    </Form>
  );
};

export default UpdateProductForm;
