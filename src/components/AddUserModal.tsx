import {useState, useRef } from 'react';
import { Button,Col, Form, Modal, Row } from 'react-bootstrap';
import '../css/formModal.css'

import '../css/whiteListSection.css'



interface addUserProps {
    addUser: (name: string, image: string) => void;
}

function AddUserModal({ addUser }: addUserProps) {
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    // Handles opening/closing the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Validates and handles the form submission
    const handleSubmit = (event: any) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            
        if (fullNameRef.current != null && emailRef.current != null) {
            const fullName = fullNameRef.current.value;
            const email = emailRef.current.value;
            addUser(fullName, email);
        }
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        handleClose();
    };


    return (
        <>
            {/* https://react-bootstrap.netlify.app/docs/components/overlays/ */}
            {/* Adds the tooltip to the Request to Be Featured button */}
            <Row style={{ paddingTop: '20px' }}>
                <Col className='add-user-button'>
                    <Button onClick={handleShow} aria-label='Add User Icon'> Add New User</Button>
                </Col>
            </Row>

            {/* Modal with nested form components */}
            <Modal show={show} onHide={handleClose} className='customized-modal'>
                <Modal.Header closeButton >
                    <Modal.Title>Request to be Featured</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}  >
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
                                    ref={fullNameRef}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <h6 style={{ color: 'white' }}>Please enter full name </h6>
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
                                    placeholder="name@gmail.com"
                                    alt='Email Text Input'
                                    ref={emailRef}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <h6 style={{ color: 'white' }}>Please enter a valid email</h6>

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
                                <Button type='button' variant="light" aria-label='Submit Button' onClick={handleSubmit}>
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

export default AddUserModal;