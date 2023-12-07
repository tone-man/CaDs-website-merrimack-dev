import { useState } from 'react';
import { Button, ButtonToolbar, Col, Form, Modal, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../css/formModal.css'
import TextInputFormGroup from './TextInputFormGroup';

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
      <h2 className='tooltip-text'>Interested in being featured on this project? Make a request here! </h2>
    </Tooltip>
  );

  return (
    <>
      {/* https://react-bootstrap.netlify.app/docs/components/overlays/ */}
      {/* Adds the tooltip to the Request to Be Featured button */}
      <ButtonToolbar>
        <OverlayTrigger placement="left" overlay={tooltip}>
          <Button variant='light' className='request-button' onClick={handleShow}>
            <i className="bi bi-people-fill request-icon" aria-label='Request to be Featured Icon'></i>
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>

      {/* Modal with nested form components */}
      <Modal show={show} onHide={handleClose} className='customized-modal'>
        <Modal.Header closeButton >
          <Modal.Title><h1 className='mediumFont metropolisBold'>Request to be Featured</h1></Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}  >
          <Modal.Body >

           {/* Full Name Text Input */}
            <Row className="mb-3">
              <TextInputFormGroup
                controlId='validationCustom01'
                label='Full Name'
                type='text'
                required={true}
                placeholder='John Doe'
                alt='Full Name Text Input'
                feedbackMessage='Please choose your full name.' />
            </Row>

              {/*Email Text Input */}
            <Row className="mb-3">
              <TextInputFormGroup
                controlId='validationCustom02'
                label='Email'
                type='email'
                required={true}
                placeholder='name@example.com'
                alt='Email Text Input'
                feedbackMessage='Please enter a valid email' />
            </Row>

            {/*Request Text Input */}
            <Row>
              <Form.Group controlId="validationCustomUsername">
                <Form.Label><h2 className='smallFont metropolisRegular'>Request</h2></Form.Label>
                <Form.Control
                  className='extraSmallFont metropolisRegular'
                  as="textarea"
                  rows={3}
                  type='text'
                  placeholder="Your Request"
                  aria-describedby="inputGroupPrepend"
                  required
                  aria-label='Request Text Input'
                />
                <Form.Control.Feedback type="invalid">
                <h6 style={{ color: 'white' }}>Please enter your Request</h6>
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            
          </Modal.Body>
          <Modal.Footer >
            {/* Submit and Cancel Buttons */}
            <Row className='ml-auto'>
              <Col>
                <Button variant="secondary" onClick={handleClose} aria-label='Cancel Button' className='extraSmallFont metropolisRegular' >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button type='submit' variant="light" aria-label='Submit Button' className='extraSmallFont metropolisRegular'>
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