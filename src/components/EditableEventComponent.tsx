import { getDatabase, onValue, ref } from "firebase/database"
import { Container, Col, Row, Form, Button } from "react-bootstrap"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import { useState, useEffect } from "react"
import '../css/editableEvent.css'
import { handleTextAreaChange, reorderNestedComponents, deleteNestedComponent, getMaxNestedOrder } from '../utils/editingComponents';


export interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: unknown,
    componentKey: string,
    pathName: string,
}
/**
 * Component for displaying and editing event data for a component in a draft.
 * Allows edit and deletion privileges to users.
 */
function EditableEventComponent(myProps: editableComponentProps) {

    const db = getDatabase();
    const myRef = ref(db);

    // Get all data that we will be displaying
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    const [link, setLink] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');

    const [lastNestedOrder, setLastNestedOrder] = useState<number | null>(null);
    const [buttons, setButtons] = useState<JSX.Element | null>(null); 
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);



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

        // Create a reference to the database using the provided pathName
        const componentRef = ref(db, myProps.pathName);

       getMaxNestedOrder(componentRef, myProps.pageOrder, setLastNestedOrder)

      

    }, [myProps]);

    // Set the buttons that will be rendered above a nested component
    useEffect(() => {
        setButtons(
            <>
                <Row style={{display: 'flex', alignItems: 'center' }}>
                    <Col md={8} sm={8} xs={8}  className="nested-component-title">
                        <h1> {myProps.data.title}</h1>
                    </Col>
                    <Col md={4} sm={4} xs={4} >
                        <Row>
                            <Col className="reorder-nested-component" md={6} sm={6} xs={5} style={{ textAlign: 'right' }}>
                                <Button disabled={myProps.nestedOrder === 0} onClick={() => reorderNestedComponents(true, myRef, myProps)} > <i className="bi bi-arrow-up-short"></i></Button>
                            </Col>
                            <Col className="reorder-nested-component" md={6} sm={3} xs={5} style={{ textAlign: 'left' }}>
                                <Button disabled={myProps.nestedOrder === lastNestedOrder} onClick={() => reorderNestedComponents(false, myRef, myProps)}> <i className="bi bi-arrow-down-short"></i></Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }, [lastNestedOrder, myProps]);


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
                {buttons}
                <Container className="event-styling">
                    <Row>

                        <Form>
                            <Row>
                                <Col md={6} sm={6} xs={6}>
                                    <Col md={12} sm={12} xs={12}>
                                        <Form.Label className="form-label" id="customFile" aria-required><h2 className='smallFont metropolisRegular'>Event Title</h2></Form.Label>
                                    </Col>
                                </Col>
                                <Col md={6} sm={6} xs={6}>
                                    <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="delete-nested-component">
                                        <Button onClick={handleOpenConfirmationModal}> <i className="bi bi-x-lg"></i></Button>
                                    </Col>
                                </Col>
                            </Row>
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
            </Container >
        </div >
    )
}

export default EditableEventComponent
