import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Request from '../firebase/requests';

interface myProps {
    show:  boolean,
    showModal: boolean | undefined;
    handleClose: boolean | undefined;
    request: Request
}

const RequestModal = (props : myProps) => {

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Title:</label>
        <input
          type="text"
          name="requestTitle"
          value={props.request.requestTitle}
          readOnly
        />

        <label>Name:</label>
        <input
          type="text"
          name="requestName"
          value={props.request.requestName}
          readOnly
        />

        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={props.request.email}
          readOnly
        />

        <label>Body:</label>
        <input
          type="text"
          name="requestBody"
          value={props.request.requestBody}
          readOnly
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default RequestModal;
