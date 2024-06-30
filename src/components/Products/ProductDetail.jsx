import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import ProductConfirmation from './ProductConfirmation'; // Assuming you have a ProductConfirmation component

const ProductDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('There was an error fetching the product details!');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3306/products/${id}`);
      alert('Product deleted successfully');
      history.push('/products'); // Redirect to product list or another appropriate page
    } catch (error) {
      console.error('There was an error deleting the product!', error);
      setError('There was an error deleting the product!');
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    handleDelete();
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Price: ${product.price}</Card.Text>
          <Button variant="danger" onClick={() => setShowConfirmation(true)}>Delete</Button>
        </Card.Body>
      </Card>

      <ProductConfirmation
        show={showConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirm={handleConfirmDelete}
        action="Delete Product"
      />
    </>
  );
};

export default ProductDetail;
