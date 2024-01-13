import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogoutConfirm = ({ show, onClose }) => {

    const navigate = useNavigate();
  

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Logout Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to logout?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          // Your logout logic hereba
          navigate('/logout')
        }}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutConfirm;