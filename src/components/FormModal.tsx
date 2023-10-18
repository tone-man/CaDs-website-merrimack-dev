import { useState } from 'react'

import { Button, Form, Modal } from 'react-bootstrap'

import '../css/formModal.css'


interface FormData {
  name: string;
  email: string;
  request: string;
}
// https://stackoverflow.com/questions/66821178/how-to-use-setformdata-to-store-data-in-form
function FormModal() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    request: '',
  });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; request?: string }>({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; request?: string } = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!isEmailValid(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.request) {
      errors.request = 'Request is required';
    }

    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.request;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      //Reset form data
      setFormData({
        name: '',
        email: '',
        request: ''
      });
      // Close the modal
      handleClose();
    }
  };


  return (
    <>
      <Button variant='light' style={{ height: '60px' }} onClick={handleShow}><i className="bi bi-people-fill" style={{ color: 'black', fontSize: '2rem' }}></i> </Button>

      <Modal show={show} onHide={handleClose} className='customized-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Request to be Featured</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                autoFocus
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {formErrors.name && <Form.Text className="text-danger">{formErrors.name}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {formErrors.email && <Form.Text className="text-danger">{formErrors.email}</Form.Text>}
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Request</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder='Enter your request'
                onChange={(e) => setFormData({ ...formData, request: e.target.value })}
              />
              {formErrors.request && <Form.Text className="text-danger">{formErrors.request}</Form.Text>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="light" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormModal
