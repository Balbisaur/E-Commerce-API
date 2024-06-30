import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert } from 'react-bootstrap';

const TrackOrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/orders/${id}/status`);
        setOrder(response.data);
      } catch (error) {
        setError('There was an error fetching the order status!');
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
        <Card.Title>Order Status for Order #{order.id}</Card.Title>
        <Card.Text>Order Date: {order.orderDate}</Card.Text>
        <Card.Text>Status: {order.status}</Card.Text>
        <Card.Text>Expected Delivery Date: {order.expectedDeliveryDate}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TrackOrderStatus;
