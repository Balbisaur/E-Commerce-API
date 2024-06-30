import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductConfirmation = ({ show, handleClose, handleConfirm, action }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm {action}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to {action.toLowerCase()} this product?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

ProductConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

export default ProductConfirmation;
