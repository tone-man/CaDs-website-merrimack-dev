import { useState, useRef, HtmlHTMLAttributes } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import '../css/formModal.css'
import '../css/whiteListSection.css'
import TextInputFormGroup from './TextInputFormGroup';
import FireBaseApp from '../firebase';
import { emailToFirebase } from '../firebase/firebaseFormatter';
import { getDatabase, ref, set } from 'firebase/database';
import User from '../firebase/user';

// This modal pops up to provide the user with a format to enter new user information
// TODO: Add more information potentially
function AddUserModal() {

    const fullNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [userLevel, setUserLevel] = useState<string>("Faculty");
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const departmentRef = useRef<HTMLInputElement | null>(null);
    const prounounsRef = useRef<HTMLInputElement | null>(null);
    const officeLocationRef = useRef<HTMLInputElement | null>(null);

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Handles opening/closing the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLevel(event.target.value);
    }


    // Handles submission of the form and closing of the modal in one. 
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        // Checks form validity
        if (form.checkValidity()) {
            // Gets form information and calls addUser() with respective info
            if (!fullNameRef.current || !emailRef.current || !userLevelRef.current || !phoneNumberRef.current || !titleRef.current || !departmentRef.current || !prounounsRef.current || !officeLocationRef.current) {
                console.error("error");
            } else {
                const db = getDatabase(FireBaseApp);
                let id = emailToFirebase(emailRef.current.value);
                let newUser = new User(id, emailRef.current.value, fullNameRef.current.value, "", userLevelRef.current.value, phoneNumberRef.current.value, titleRef.current.value, prounounsRef.current.value, departmentRef.current.value, officeLocationRef.current.value);
                set(ref(db, 'users/' + id), newUser.toFirebaseObject());
            }
            // TODO: Photos
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
            <Modal size="lg" show={show} onHide={handleClose} className='customized-modal'>
                <Modal.Header closeButton>
                    <Modal.Title><h1 className='mediumFont metropolisBold'>Add New User</h1></Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}  >
                    <Modal.Body >
                        {/* Full Name Text Input */}
                        <Row>
                            <Col md={6} sm={12} className="mb-3">

                                <TextInputFormGroup
                                    controlId='validationCustom01'
                                    label='Full Name'
                                    required={true}
                                    placeholder='Ex: John Doe'
                                    alt='Full Name Text Input'
                                    inputRef={fullNameRef}
                                    type='text'
                                    feedbackMessage='Please enter full name' />
                            </Col>

                            {/*Email Text Input*/}
                            <Col md={6} sm={12} className="mb-3">
                                <TextInputFormGroup
                                    controlId='validationCustom02'
                                    label='Email'
                                    type='email'
                                    required={true}
                                    placeholder='Ex: name@example.com'
                                    alt='Email Text Input'
                                    inputRef={emailRef}
                                    feedbackMessage='Please enter a valid email' />
                            </Col>
                        </Row>

                        {/* Title Input */}
                        <Row>
                            <Col md={6} sm={12} className="mb-3">

                                <TextInputFormGroup
                                    controlId='validationCustom04'
                                    label='Position'
                                    type='text'
                                    required={true}
                                    placeholder='Ex: Adjunct Professor'
                                    alt='Title Text Input'
                                    inputRef={titleRef}
                                    feedbackMessage='Please enter a valid location' />
                            </Col>

                            {/* Department Input */}
                            <Col md={6} sm={12} className="mb-3">


                                <TextInputFormGroup
                                    controlId='validationCustom05'
                                    label='Department'
                                    type='text'
                                    required={true}
                                    placeholder='Ex: Campus Center'
                                    alt='Department Text Input'
                                    inputRef={departmentRef}
                                    feedbackMessage='Please enter a valid location' />
                            </Col>
                        </Row>

                        {/* Location Input */}
                        <Row>
                            <Col md={6} sm={12} className="mb-3">

                                <TextInputFormGroup
                                    controlId='validationCustom03'
                                    label='Office Location'
                                    type='text'
                                    required={true}
                                    placeholder='Ex: 101 Campus Room'
                                    alt='Office Location Text Input'
                                    inputRef={officeLocationRef}
                                    feedbackMessage='Please enter a valid location' />
                            </Col>

                            {/* Phone Number Input */}
                            <Col md={6} sm={12} className="mb-3">

                                <TextInputFormGroup
                                    controlId='validationCustom07'
                                    label='Phone Number'
                                    type='text'
                                    required={true}
                                    placeholder='Ex: 123-654-0987'
                                    alt='Phonenumber Text Input'
                                    inputRef={phoneNumberRef}
                                    feedbackMessage='Please enter a valid location' />
                            </Col>
                        </Row>

                        {/*User Level Input*/}
                        <Row>
                            <Col md={6} sm={12} className="mb-3">

                                <Form.Label><h2 className='smallFont metropolisRegular'>User Level</h2></Form.Label>
                                {['Faculty', 'Administrator'].map((userLevel) => (
                                    <div key={userLevel} className="mb-3">
                                        <Form.Check
                                            type='radio'
                                            id={userLevel}
                                            label={userLevel}
                                            name="userLevels"
                                            value={userLevel}
                                            required={true}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                ))}
                            </Col>


                            {/*Pronouns Input*/}
                            <Col md={6} sm={12} className="mb-3">

                                <TextInputFormGroup
                                    controlId='validationCustom08'
                                    label='Pronouns'
                                    type='text'
                                    required={true}
                                    placeholder='Ex: 123-654-0987'
                                    alt='Prounoun Text Input'
                                    inputRef={prounounsRef}
                                    feedbackMessage='Please enter a valid prounouns' />
                            </Col>
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