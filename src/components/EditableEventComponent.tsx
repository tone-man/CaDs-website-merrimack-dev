import { DatabaseReference, child, get, getDatabase, onValue, ref, remove, set, update } from "firebase/database"
import { Container, Col, Row, Form, Button } from "react-bootstrap"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import { useState, useEffect, ChangeEvent } from "react"
import '../css/editableEvent.css'
import { handleTextAreaChange, reorderNestedComponents, deleteNestedComponent} from '../utils/editingComponents'; // Import the update function from your database library


export interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: unknown,
    componentKey: string,
    pathName: string,
}


function EditableEventComponent(myProps: editableComponentProps) {

    const db = getDatabase();
    const myRef = ref(db);

    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    const [link, setLink] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');



    // Set the JSON value that will be displayed to the text area whenever myProps change
    useEffect(() => {
        setDescription(myProps.data.description);
        setTitle(myProps.data.title);
        setLocation(myProps.data.location)
        setDate(myProps.data.date)

        setLink(myProps.data.link);
        setImageSource(myProps.data.imgSource);
        setImageAlt(myProps.data.imageAlt)
        setImageCaption(myProps.data.caption)
    }, [myProps]);

    useEffect(() => {
        // Create a reference to the database using the provided pathName
        const projects = ref(db, myProps.pathName);

        // Set up a listener to the database using onValue
        // The listener will update the state variable 'snapshot' with the retrieved data
        onValue(projects, (snapshot) => {
            let max = 0;
            let count = 0;
            // Iterate through the retrieved data to find the maximum nested order
            for (const [, value] of Object.entries(snapshot.val())) {
                if (value.pageOrder === myProps.pageOrder) {
                    if (value.nestedOrder > max) {
                        max = value.nestedOrder;
                    }
                    count++;
                }
            }
            // Dont allow user to delete component if it is the last event or project
            if (myProps.data.type === 'event' || myProps.data.type === 'project') {
                if (count === 1) {
                    // setIsNotDeletable(true)
                }
                else {
                    // setIsNotDeletable(false)
                }
            }
            // Update the state variable with the maximum nested order
            // setMaxNestedOrder(max);

        });
    }, [myProps]);


    // Opens the deletion confirmation modal
    function handleOpenConfirmationModal() {
        setShowDeletionModal(true);
    }

   






    // Handles confirmed deletion and hiding the modal
    function remove() {
        deleteNestedComponent(myProps, db)
        setShowDeletionModal(false);
    }




    return (
        <div>
            <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + myProps.data.type} />
            <Container className="individual-event">
                <Row>
                    <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="delete-component">
                        <Button onClick={handleOpenConfirmationModal}> <i className="bi bi-trash"></i></Button>
                    </Col>
                </Row>
                <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
                    <Button onClick={() => reorderNestedComponents(true, myRef, myProps)} style={{ color: 'white', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-up-short"></i></Button>
                </Col>
                <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
                    <Button style={{ color: 'white', background: 'grey', border: 'none' }} onClick={() => reorderNestedComponents(false, myRef, myProps)}> <i className="bi bi-arrow-down-short"></i></Button>
                </Col>
                <Container className="styling">

                    <Row>

                        <Form>
                            <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Event Title</h2></Form.Label>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control value={title} onChange={(e) => handleTextAreaChange(e, '/title', setTitle, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Event Description</h2></Form.Label>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control value={description} onChange={(e) => handleTextAreaChange(e, '/description', setDescription, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={5} style={{ resize: 'none', border: '1px black solid' }} />
                            </Form.Group>
                        </Form>


                        <Row>
                            <Col md={6}>
                                <Form>

                                    <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Location</h2></Form.Label>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control value={location} onChange={(e) => handleTextAreaChange(e, '/location', setLocation, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form>
                                    <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Date</h2></Form.Label>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control value={date} onChange={(e) => handleTextAreaChange(e, '/date', setDate, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form>
                                    <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Image Source</h2></Form.Label>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control value={imageSource} onChange={(e) => handleTextAreaChange(e, '/imgSource', setImageSource, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form>
                                    <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Image Alt</h2></Form.Label>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control value={imageAlt} onChange={(e) => handleTextAreaChange(e, '/imageAlt', setImageAlt, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                        <Form>
                            <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Image Caption</h2></Form.Label>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control value={imageCaption} onChange={(e) => handleTextAreaChange(e, '/caption', setImageCaption, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
                            </Form.Group>
                        </Form>
                        <Form>
                            <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Link</h2></Form.Label>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control value={link} onChange={(e) => handleTextAreaChange(e, '/link', setLink, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
                            </Form.Group>
                        </Form>
                    </Row>
                </Container>
            </Container>
        </div >
    )
}

export default EditableEventComponent
