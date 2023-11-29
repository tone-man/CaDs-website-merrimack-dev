import { useState, useRef } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import '../css/formModal.css'
import '../css/whiteListSection.css'
import TextInputFormGroup from './TextInputFormGroup';
import { User } from '../firebase/user';

// This modal pops up to provide the user with a format to enter new user information
// TODO: Add more information potentially
function AddUserModal() {

    const fullNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const userLevel = useRef<HTMLInputElement | null>(null);
    const phoneNumber = useRef<HTMLInputElement | null>(null);

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Handles opening/closing the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handles submission of the form and closing of the modal in one. 
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        // Checks form validity
        if (form.checkValidity()) {
            // Gets form information and calls addUser() with respective info
            if (fullNameRef.current && emailRef.current && userLevel.current && phoneNumber.current) {

                setSelectedImage(null);
            }
            handleClose();
        }
        setValidated(true);
    };


    return (
        <>
            {/* Customizes the add user button */}
            <Row style={{ paddingTop: '20px' }}>
                <Col className='add-user-button'>
                    <Button onClick={handleShow} aria-label='Add User Icon'> Add New User</Button>
                </Col>
            </Row>

            {/* Modal with nested form components */}
            <Modal show={show} onHide={handleClose} className='customized-modal'>
                <Modal.Header closeButton>
                    <Modal.Title><h1 className='mediumFont metropolisBold'>Add New User</h1></Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}  >
                    <Modal.Body >
                        {/* Full Name Text Input */}
                        <Row className="mb-3">
                            <TextInputFormGroup
                                controlId='validationCustom01'
                                label='Full Name'
                                required={true}
                                placeholder='Ex: John Doe'
                                alt='Full Name Text Input'
                                inputRef={fullNameRef}
                                type='text'
                                feedbackMessage='Please enter full name' />
                        </Row>


                        {/*Email Text Input*/}
                        <Row className="mb-3">
                            <TextInputFormGroup
                                controlId='validationCustom02'
                                label='Email'
                                type='email'
                                required={true}
                                placeholder='Ex: name@example.com'
                                alt='Email Text Input'
                                inputRef={emailRef}
                                feedbackMessage='Please enter a valid email' />
                        </Row>
                        {/*User Level Input*/}
                        <Row className="mb-3">
                            <Form.Label><h2 className='smallFont metropolisRegular'>User Level</h2></Form.Label>
                            {['Faculty', 'Administrator'].map((userLevel) => (
                                <div key={userLevel} className="mb-3">
                                    <Form.Check
                                        type='radio'
                                        id={userLevel}
                                        label={userLevel}
                                        name="userLevels"
                                    />
                                </div>
                            ))}
                        </Row>

                        {/*User Level Input*/}
                        <Row className="mb-3">
                            <Form.Label><h2 className='smallFont metropolisRegular'>Preferred Pronouns</h2></Form.Label>
                            {['he/him', 'she/her', 'they/them'].map((pronouns) => (
                                <div key={pronouns} className="mb-3">
                                    <Form.Check
                                        type='radio'
                                        id={pronouns}
                                        label={pronouns}
                                        name="prounouns"
                                    />
                                </div>
                            ))}
                        </Row>

                        {/* Title Input */}
                        <Row className="mb-3">
                            <TextInputFormGroup
                                controlId='validationCustom04'
                                label='Position'
                                type='text'
                                required={true}
                                placeholder='Ex: Adjunct Professor'
                                alt='Title Text Input'
                                inputRef={undefined}
                                feedbackMessage='Please enter a valid location' />
                        </Row>
                        {/* Department Input */}
                        <Row className="mb-3">
                            <TextInputFormGroup
                                controlId='validationCustom05'
                                label='Department'
                                type='text'
                                required={true}
                                placeholder='Ex: Campus Center'
                                alt='Department Text Input'
                                inputRef={undefined}
                                feedbackMessage='Please enter a valid location' />
                        </Row>

                        {/* Location Input */}
                        <Row className="mb-3">
                            <TextInputFormGroup
                                controlId='validationCustom03'
                                label='Office Location'
                                type='text'
                                required={true}
                                placeholder='Ex: 101 Campus Room'
                                alt='Office Location Text Input'
                                inputRef={undefined}
                                feedbackMessage='Please enter a valid location' />
                        </Row>



                        {/* Phone Number Input */}
                        <Row className="mb-3">
                            <TextInputFormGroup
                                controlId='validationCustom07'
                                label='Phone Number'
                                type='text'
                                required={true}
                                placeholder='Ex: 123-654-0987'
                                alt='Phonenumber Text Input'
                                inputRef={undefined}
                                feedbackMessage='Please enter a valid location' />
                        </Row>

                        {/* https://mdbootstrap.com/docs/standard/forms/file/ */}
                        {/* https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component */}
                        {/* https://surajsharma.net/blog/react-file-upload-accept-only-images */}
                        {/* Image Selector for new user*/}
                        <Row className="mb-3">
                            <Form.Group controlId="validationCustom03">
                                <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Profile Image</h2></Form.Label>
                                <input
                                    type="file" //allow file selector
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
                                    required={false}
                                />
                                <Form.Control.Feedback type="invalid">
                                    <h6 style={{ color: 'white' }}>Please choose an image</h6>
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                    </Modal.Body>

                    {/* Submit and Cancel Buttons */}
                    <Modal.Footer >
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

export default AddUserModal;