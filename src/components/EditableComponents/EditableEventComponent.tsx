import { getDatabase, ref } from "firebase/database"
import { Button, Container, Col, Row } from "react-bootstrap"
import { useState, useEffect } from "react"

import '../../css/editableCSS/editableEvent.css'

import EditableFormComponent from "./EditableFormComponent"
import DeleteConfirmationModal from "../DeleteConfirmationModal"
import { handleTextAreaChange, reorderNestedComponents, deleteNestedComponent, getMaxNestedOrder } from '../../utils/editingComponents';

export interface editableEventProps {
    description: string;
    title: string;
    location: string;
    date: string;
    link: string;
    imgSource: string;
    imageAlt: string;
    caption: string;
    type: string
}
export interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: editableEventProps,
    componentKey: string,
    pathName: string,
    addToast: (message: string, type: 'success' | 'warning' | 'danger') => void;
}

/**
 * Component for displaying and editing event data
 * Allows edit and deletion privileges to users.
 */
function EditableEventComponent(myProps: editableComponentProps) {
    
    const db = getDatabase();
    const myRef = ref(db);

    // Create useStates for all data that we will be displaying
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    const [link, setLink] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageCaption, setImageCaption] = useState('');

    const [buttons, setButtons] = useState<JSX.Element | null>(null);
    const [lastNestedOrder, setLastNestedOrder] = useState<number | null>(null);
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);


  // Initialize usestates using data from props in the useEffect (once on initial render).
  useEffect(() => {
        setLink(myProps.data.link);
        setDate(myProps.data.date);
        setImageCaption(myProps.data.caption);
        setLocation(myProps.data.location);
        setImageSource(myProps.data.imgSource);
        setImageAlt(myProps.data.imageAlt);
        setTitle(myProps.data.title);
        setDescription(myProps.data.description);
    }, []);


    // Set last page order using getMaxPageOrder function call
    useEffect(() => {
        const componentRef = ref(db, myProps.pathName);
        // Get the max nested order for the specific component
        getMaxNestedOrder(componentRef, myProps.pageOrder, setLastNestedOrder)
    }, [db, myProps]);


    // Set the buttons that will be rendered
    useEffect(() => {
        setButtons(
            <>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col md={8} sm={8} xs={12} className="nested-component-title">
                        <h1> {myProps.data.title}</h1>
                    </Col>
                    <Col md={4} sm={4} xs={12} >
                        <Row>
                            <Col className="reorder-nested-component" md={6} sm={6} xs={5} style={{ textAlign: 'right' }}>
                                <Button
                                    disabled={myProps.nestedOrder === 0}
                                    onClick={() =>
                                        reorderNestedComponents(true, myRef, myProps)} >
                                    <i className="bi bi-arrow-up-short">
                                    </i>
                                </Button>
                            </Col>
                            <Col className="reorder-nested-component" md={6} sm={3} xs={5} style={{ textAlign: 'left' }}>
                                <Button
                                    disabled={myProps.nestedOrder === lastNestedOrder}
                                    onClick={() => reorderNestedComponents(false, myRef, myProps)}>
                                    <i className="bi bi-arrow-down-short"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }, [lastNestedOrder, myProps, myRef]);

    // Opens the deletion confirmation modal
    function handleOpenConfirmationModal() {
        setShowDeletionModal(true);
    }

    // Handles confirmed deletion and hiding the modal
    function remove() {
        deleteNestedComponent(myProps, db, myProps.addToast, "event")
        setShowDeletionModal(false);
    }

    return (
        <div>
            <Container className="individual-event" >
                <DeleteConfirmationModal
                    show={showDeleteModal}
                    onHide={() => setShowDeletionModal(false)}
                    onConfirm={remove}
                    name={'this ' + myProps.data.type} />
                {buttons}
                <Container className="event-styling" >
                    <Row>
                        <EditableFormComponent
                            changedValue='/title'
                            myRef={myRef}
                            value={title}
                            setValue={setTitle}
                            pathName={myProps.pathName}
                            componentKey={myProps.componentKey}
                            label="Title"
                            handleTextAreaChange={handleTextAreaChange}
                            rows={1}
                            delete={true}
                            handleOpenConfirmationModal={handleOpenConfirmationModal} />

                        <EditableFormComponent
                            changedValue='/description'
                            myRef={myRef}
                            value={description}
                            setValue={setDescription}
                            pathName={myProps.pathName}
                            componentKey={myProps.componentKey}
                            label="Description"
                            handleTextAreaChange={handleTextAreaChange}
                            rows={3}
                            delete={false} />
                        <Row>
                            <Col md={6} sm={12} xs={12}>
                                <EditableFormComponent
                                    changedValue='/location'
                                    myRef={myRef}
                                    value={location}
                                    setValue={setLocation}
                                    pathName={myProps.pathName}
                                    componentKey={myProps.componentKey}
                                    label="Location"
                                    handleTextAreaChange={handleTextAreaChange}
                                    delete={false}
                                    rows={1} />
                            </Col>
                            <Col md={6} sm={12} xs={12}>
                                <EditableFormComponent
                                    changedValue='/date'
                                    myRef={myRef}
                                    value={date}
                                    setValue={setDate}
                                    pathName={myProps.pathName}
                                    componentKey={myProps.componentKey}
                                    label="Date"
                                    delete={false}
                                    handleTextAreaChange={handleTextAreaChange}
                                    rows={1} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12} xs={12}>
                                <EditableFormComponent
                                    changedValue='/imgSource'
                                    myRef={myRef}
                                    value={imageSource}
                                    setValue={setImageSource}
                                    pathName={myProps.pathName}
                                    componentKey={myProps.componentKey}
                                    label="Image Source"
                                    delete={false}
                                    handleTextAreaChange={handleTextAreaChange}
                                    rows={1} />
                            </Col>
                            <Col md={6} sm={12} xs={12}>
                                <EditableFormComponent
                                    changedValue='/imageAlt'
                                    myRef={myRef}
                                    value={imageAlt}
                                    setValue={setImageAlt}
                                    pathName={myProps.pathName}
                                    componentKey={myProps.componentKey}
                                    label="Image Alt"
                                    delete={false}
                                    handleTextAreaChange={handleTextAreaChange}
                                    rows={1} />
                            </Col>
                        </Row>
                        <EditableFormComponent
                            changedValue='/caption'
                            myRef={myRef}
                            value={imageCaption}
                            setValue={setImageCaption}
                            pathName={myProps.pathName}
                            componentKey={myProps.componentKey}
                            label="Image Caption"
                            handleTextAreaChange={handleTextAreaChange}
                            delete={false}
                            rows={1} />
                        <EditableFormComponent
                            changedValue='/link'
                            myRef={myRef}
                            value={link}
                            setValue={setLink}
                            pathName={myProps.pathName}
                            componentKey={myProps.componentKey}
                            label="Link"
                            handleTextAreaChange={handleTextAreaChange}
                            delete={false}
                            rows={1} />
                    </Row>
                </Container>
            </Container>
        </div >
    )
}

export default EditableEventComponent
