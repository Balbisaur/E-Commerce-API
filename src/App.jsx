import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './pages/Home';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={NavLink} to="/">E-Commerce</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" activeClassName="active" exact>Home</Nav.Link>
          <Nav.Link as={NavLink} to="/customers" activeClassName="active">Customers</Nav.Link>
          <Nav.Link as={NavLink} to="/products" activeClassName="active">Products</Nav.Link>
          <Nav.Link as={NavLink} to="/orders" activeClassName="active">Orders</Nav.Link>
        </Nav>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers/*" element={<CustomersPage />} />
        <Route path="/products/*" element={<ProductsPage />} />
        <Route path="/orders/*" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
};

export default App;



