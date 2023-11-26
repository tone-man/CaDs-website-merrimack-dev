import { useState, useRef } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import '../css/formModal.css'
import '../css/whiteListSection.css'
import TextInputFormGroup from './TextInputFormGroup';

interface editUserProps {
    editUser: (id: number, name: string, email: string, image: string | undefined) => void;
    id: string,
    name: string,
    email: string
}

// This modal pops up to allow users to edit white list user information
// TODO: Add more information potentially
function EditUserModal({ editUser, id, name, email }: editUserProps) {

    // UseRef and UseState variable declarations
    const fullNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // Use File type for selectedImage state

    // Handles opening/closing the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Handles submission of the form and closing of the modal in one. 
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {

        event.preventDefault(); // Stops typical form behavior like reloading the page
        event.stopPropagation(); // Stops other event handlers from receiving this event
        const form = event.currentTarget;

        // Checks form validity
        if (form.checkValidity()) {
            
            // Gets form information and calls editUser() with the respective info
            if (fullNameRef.current && emailRef.current) {
                const fullName = fullNameRef.current.value;
                const email = emailRef.current.value;
                if (selectedImage){
                    editUser(id, fullName, email, URL.createObjectURL(selectedImage));
                    setSelectedImage(null);
                }
                else {
                    editUser(id, fullName, email, undefined);
                }
                
            }
            setValidated(true);
            handleClose();
        }
    };


    return (
        <>

            {/* Customizes the button */}
            <Row style={{ padding: '10px' }}>
                <Button className='edit-button' onClick={handleShow} >Edit</Button>
            </Row>

            {/* Modal with nested form components */}
            <Modal show={show} onHide={handleClose} className='customized-modal'>
                <Modal.Header closeButton>
                    <Modal.Title><h1 className='mediumFont metropolisBold'>Edit User {name}</h1></Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}  >
                    <Modal.Body >
                        
                      {/* Full Name Text Input */}
                        <Row className="mb-3">
                            <TextInputFormGroup
                                controlId='validationCustom01'
                                label='Full Name'
                                required={true}
                                placeholder='John Doe'
                                alt='Full Name Text Input'
                                inputRef={fullNameRef}
                                type='text'
                                default={name}
                                feedbackMessage='Please enter full name' />
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
                                inputRef={emailRef}
                                feedbackMessage='Please enter a valid email'
                                default={email} />
                        </Row>
                        {/* https://mdbootstrap.com/docs/standard/forms/file/ */}
                        {/* https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component */}
                        {/* https://surajsharma.net/blog/react-file-upload-accept-only-images */}
                        {/* Image Selector for new user*/}
                        <Row className="mb-3">
                            <Form.Group controlId="validationCustom03">
                                <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Image</h2></Form.Label>
                                <input
                                    type="file" //file selector
                                    accept="image/png, image/jpeg" //only accept images
                                    className="form-control"
                                    id="customFile"
                                    onChange={(event) => {
                                        // Get the file that was selected, and set the selected image to it
                                        const file = event.target.files && event.target.files[0];
                                        if (file) {
                                            setSelectedImage(file);
                                        }
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <h6 style={{ color: 'white' }}>Please choose an image</h6>
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer >
                        {/* Submit and Cancel Buttons */}
                        <Row className='ml-auto'>
                            <Col>
                                <Button variant="secondary" onClick={handleClose} aria-label='Cancel Button' className='extraSmallFont metropolisRegular'>
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

export default EditUserModal;