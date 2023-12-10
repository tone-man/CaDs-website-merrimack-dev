import React, { useEffect, useState } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import Request from '../firebase/requests';
import { Form } from 'react-bootstrap';
import '../css/formModal.css'

interface myProps {
  show: boolean,
  showModal: boolean | undefined;
  handleClose: boolean | undefined;
  request: Request
}

const RequestModal = (props: myProps) => {

  return (
    <Modal show={props.show} onHide={props.handleClose} className='customized-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Row className='mb-3'>
            <Form.Label><h2 className='smallFont metropolisRegular'>Title:</h2></Form.Label>
            <Form.Control
              type="text"
              name="requestTitle"
              value={props.request.requestTitle}
              disabled
            />
          </Row>

          <Row className='mb-3'>
            <Form.Label><h2 className='smallFont metropolisRegular'>Name:</h2></Form.Label>
            <Form.Control

              type="text"
              name="requestName"
              value={props.request.requestName}
              disabled
            />
          </Row>

          <Row className='mb-3'>
            <Form.Label><h2 className='smallFont metropolisRegular'>Email:</h2></Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={props.request.email}
              disabled
            />
          </Row>

          <Row className='mb-3'>
            <Form.Label><h2 className='smallFont metropolisRegular'>Body:</h2></Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="requestBody"
              value={props.request.requestBody}
              disabled
              rows={5}
            />
          </Row>

        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="secondary" onClick={props.handleClose}>
          Delete
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default RequestModal;
