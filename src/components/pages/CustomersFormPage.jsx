import React from 'react';
import CreateCustomerForm from '../components/Customers/CreateCustomerForm';
import CustomerDetail from '../components/Customers/CustomerDetail';
import CustomerList from '../components/Customers/CustomerList';

const CustomersPage = () => {
  return (
    <div>
      <h2>Customers</h2>
      <CreateCustomerForm />
      <CustomerList />
      <CustomerDetail />
    </div>
  );
};

export default CustomersPage;
