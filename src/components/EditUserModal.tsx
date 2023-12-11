import { useState, useRef } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import '../css/formModal.css'
import '../css/whiteListSection.css'
import TextInputFormGroup from './TextInputFormGroup';
import User from '../firebase/user';

interface editUserProps {
    updateUser: (user: User) => void;
    user: User;
    isAdmin: boolean;
}

// This modal pops up to allow users to edit white list user information
// TODO: Add more information potentially
function EditUserModal(props: editUserProps) {
    const updateUser = props.updateUser;
    const user = props.user;
    const isAdmin = props.isAdmin;

    // UseRef and UseState variable declarations
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const fullNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [userLevel, setUserLevel] = useState<string>(user.userLevel);
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const departmentRef = useRef<HTMLInputElement | null>(null);
    const prounounsRef = useRef<HTMLInputElement | null>(null);
    const officeLocationRef = useRef<HTMLInputElement | null>(null);
    const photoURLRef = useRef<HTMLInputElement | null>(null);

    const [selectedImage, setSelectedImage] = useState<File | null>(null); // Use File type for selectedImage state

    // Handles opening/closing the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLevel(event.target.value);
    }


    // Handles submission of the form and closing of the modal in one. 
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {

        event.preventDefault(); // Stops typical form behavior like reloading the page
        event.stopPropagation(); // Stops other event handlers from receiving this event
        const form = event.currentTarget;

        // Checks form validity
        if (form.checkValidity()) {
            // Gets form information and calls addUser() with respective info
            if (!fullNameRef.current || !emailRef.current || !phoneNumberRef.current || !titleRef.current || !departmentRef.current || !prounounsRef.current || !officeLocationRef.current || !photoURLRef.current) {
                console.error("error");
            } else {
                let updatedUser = new User(user.id, emailRef.current.value, fullNameRef.current.value, photoURLRef.current.value, userLevel, phoneNumberRef.current.value, titleRef.current.value, prounounsRef.current.value, departmentRef.current.value, officeLocationRef.current.value);
                updateUser(updatedUser)
            }
            // TODO: Photos
        }
        setValidated(true);
        handleClose();
    };

    return (
        <>

            {/* Customizes the button */}
            <Row style={{ padding: '10px' }}>
                <Button className='edit-button' onClick={handleShow} >Edit</Button>
            </Row>

            {/* Modal with nested form components */}
            <Modal size="lg" show={show} onHide={handleClose} className='customized-modal'>
                <Modal.Header closeButton>
                    <Modal.Title><h1 className='mediumFont metropolisBold'>Edit User {name}</h1></Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}  >
                    <Modal.Body>
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
                                    default={user.name}
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
                                    default={user.email}
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
                                    default={user.title}
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
                                    default={user.department}
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
                                    default={user.location}
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
                                    default={user.phoneNumber}
                                    feedbackMessage='Please enter a valid location' />
                            </Col>
                        </Row>

                        {/*User Level Input  (only when isAdmin is true*/}
                        <Row>
                            {(isAdmin) &&

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
                                                defaultChecked={(userLevel == user.userLevel) ? true : false}
                                                onChange={handleRadioChange}
                                            />
                                        </div>
                                    ))}
                                </Col>
                            }

                            {/*Pronouns Input*/}
                            <Col md={6} sm={12} className="mb-3">
                                <TextInputFormGroup
                                    controlId='validationCustom08'
                                    label='Pronouns'
                                    type='text'
                                    required={true}
                                    placeholder='Ex: she/her/hers'
                                    alt='Prounoun Text Input'
                                    inputRef={prounounsRef}
                                    default={user.pronouns}
                                    feedbackMessage='Please enter a valid prounouns' />
                            </Col>
                        </Row>
                        <Row>
                            <TextInputFormGroup
                                    controlId='validationCustom09'
                                    label='Profile Image URL'
                                    type='text'
                                    required={true}
                                    placeholder='Ex: http://url.com'
                                    alt='Photo Url Input'
                                    inputRef={photoURLRef}
                                    default={user.photoURL}
                                    feedbackMessage='Please enter a valid prounouns' />
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