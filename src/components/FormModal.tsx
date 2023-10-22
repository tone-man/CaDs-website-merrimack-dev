import { useState } from 'react';
import {Button, ButtonToolbar, Col, Form, Modal, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../css/formModal.css'

// https://react-bootstrap.netlify.app/docs/forms/validation
// This modal component has a form nested inside of it that prompts the user for important information that will be sent to 
//the owner the of the project
//TODO: Save entered information and send it as a request to the owner of the project
function FormModal() {

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  // Handles opening/closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Validates and handles the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Customized tooltip that appears upon hovering on the buttom
  const tooltip = (
    <Tooltip id="tooltip">
      <h2 style={{ fontSize: '1rem' }}>Interested in being featured on this project? Make a request here! </h2>
    </Tooltip>
  );

  return (
    <>
    {/* https://react-bootstrap.netlify.app/docs/components/overlays/ */}

    {/* Adds the tooltip to the Request to Be Featured button */}
      <ButtonToolbar>
        <OverlayTrigger placement="left" overlay={tooltip}>
          <Button variant='light' style={{ height: '60px' }} onClick={handleShow}>
            <i className="bi bi-people-fill" style={{ color: 'black', fontSize: '2rem' }} aria-label='Request to be Featured Icon'></i>
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>

       {/* Modal with nested form components */}
       <Modal show={show} onHide={handleClose} className='customized-modal'>
        <Modal.Header closeButton >
          <Modal.Title>Request to be Featured</Modal.Title>
        </Modal.Header>
        <Form  noValidate validated={validated} onSubmit={handleSubmit}  >
          <Modal.Body >
            <Row className="mb-3">
              {/* Full Name Text Input */}
              <Form.Group controlId="validationCustom01">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="John Doe"
                  alt='Full Name Text Input'
                />
                <Form.Control.Feedback type="invalid">
                  Please choose your full name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              {/*Email Text Input */}
              <Form.Group controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="yourEmail@gmail.com"
                  alt='Email Text Input'
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="validationCustomUsername">
                {/*Request Text Input */}
                <Form.Label>Request</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type='text'
                  placeholder="Your Request"
                  aria-describedby="inputGroupPrepend"
                  required
                  aria-label='Request Text Input'
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your Request
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer >
            {/* Submit and Cancel Buttons */}
            <Row className='ml-auto'>
              <Col>
                <Button variant="secondary" onClick={handleClose} aria-label='Cancel Button'>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type='submit' variant="light" aria-label='Submit Button'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal >
    </>
  );
}

export default FormModal;