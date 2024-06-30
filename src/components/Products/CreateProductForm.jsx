import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreateProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate price as a number
      if (isNaN(parseFloat(price))) {
        throw new Error('Price must be a valid number');
      }

      await axios.post('http://localhost:3306/products', { name, price });
      alert('Product created successfully');
      // Optionally: Redirect to another page after successful creation
    } catch (error) {
      console.error('There was an error creating the product!', error);
      setError('There was an error creating the product!');
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
      <Button variant="primary" type="submit">Create Product</Button>
    </Form>
  );
};

export default CreateProductForm;
