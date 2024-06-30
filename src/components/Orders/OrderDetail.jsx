import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        setError('Sorry... we couldn\'t find those order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!order) return null;

  return (
    <Card>
      <Card.Body>
        <Card.Title>Order #{order.id}</Card.Title>
        <Card.Text>Customer ID: {order.customerId}</Card.Text>
        <Card.Text>Order Date: {order.orderDate}</Card.Text>
        <Card.Text>Products:</Card.Text>
        <ul>
          {order.products.map((product) => (
            <li key={product.id}>{product.name} - ${product.price}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

OrderDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default OrderDetail;
