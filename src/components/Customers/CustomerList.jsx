import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3306/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('There was an error fetching the customers!', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Container>
      <Row>
        {customers.map((customer) => (
          <Col key={customer.id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{customer.name}</Card.Title>
                <Card.Text>Email: {customer.email}</Card.Text>
                <Card.Text>Phone: {customer.phone}</Card.Text>
                <Button as={Link} to={`/customers/${customer.id}`} variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CustomerList;
