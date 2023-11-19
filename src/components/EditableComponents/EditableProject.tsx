import { getDatabase, ref } from "firebase/database"
import { Container, Col, Row, Button, Accordion } from "react-bootstrap"
import DeleteConfirmationModal from "../DeleteConfirmationModal"
import { useState, useEffect } from "react"
import '../../css/editableCSS/editableEvent.css'
import { handleTextAreaChange, reorderNestedComponents, deleteNestedComponent, getMaxNestedOrder, addNestedComponent, addProjectComponent } from '../../utils/editingComponents';
import EditableFormComponent from "./EditableFormComponent"
import EditableContributers from "./EditableContributers"
import '../../css/editableCSS/editableProject.css'
import EditableFaculty from "./EditableFaculty"


export interface EventData {
    description: string;
    title: string;
    location: string;
    date: string;
    link: string;
    imgSource: string;
    imageAlt: string;
    caption: string;
}


export interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: unknown,
    componentKey: string,
    pathName: string,
}

export interface editableProps {
    pageOrder: number
    nestedOrder: number
    data: any,
    componentKey: string,
    pathName: string,
}
/**
 * Component for displaying and editing event data for a component in a draft.
 * Allows edit and deletion privileges to users.
 */
function EditableProject(myProps: editableProps) {

    const db = getDatabase();
    const myRef = ref(db);

    // Get all data that we will be displaying
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const [link, setLink] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageDescription, setImageDescription] = useState('');

    const [lastNestedOrder, setLastNestedOrder] = useState<number | null>(null);
    const [buttons, setButtons] = useState<JSX.Element | null>(null);
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);


    // Set the JSON value that will be displayed to the text area whenever myProps change
    useEffect(() => {



        setDescription(myProps.data.description);
        setTitle(myProps.data.title);

        setLink(myProps.data.projectLink);
        setImageSource(myProps.data.imgSource);
        setImageAlt(myProps.data.imageAlt)
        setImageDescription(myProps.data.imageDescription)

        // Create a reference to the database using the provided pathName
        const componentRef = ref(db, myProps.pathName);

        // Get the max nested order for the specific component
        getMaxNestedOrder(componentRef, myProps.pageOrder, setLastNestedOrder)

    }, [myProps]);

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

            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeletionModal(false)}
                onConfirm={remove}
                name={'this ' + myProps.data.type} />
            <Container className="individual-event">

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
                            changedValue='/imageDescription'
                            myRef={myRef}
                            value={imageDescription}
                            setValue={setImageDescription}
                            pathName={myProps.pathName}
                            componentKey={myProps.componentKey}
                            label="Image Description"
                            handleTextAreaChange={handleTextAreaChange}
                            delete={false}
                            rows={1} />
                        <EditableFormComponent
                            changedValue='/projectLink'
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

                    <Accordion className="contributer-accordion" >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="header">Contributers</h4>
                            </Accordion.Header>
                            <div className="accordion-body-container">
                                <Accordion.Body >
                                    <Col md={12} sm={12} xs={12}>
                                        <Row>
                                            <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="add-component">
                                                <Button
                                                    onClick={() =>
                                                        addProjectComponent(myProps, db, ref(db, myProps.pathName), true)}>
                                                    <i className="bi bi-plus-lg" />
                                                </Button>
                                            </Col>

                                        </Row>
                                    </Col>
                                    {(myProps.data && typeof myProps.data.contributers === 'object') && (
                                        Object.keys(myProps.data.contributers).map((key) => {
                                            const contributor = myProps.data.contributers[key];
                                            return (
                                                <EditableContributers
                                                    data={contributor}
                                                    pageOrder={contributor.pageOrder}
                                                    nestedOrder={contributor.nestedOrder}
                                                    componentKey={key}
                                                    pathName={myProps.pathName + "/" + myProps.componentKey + '/contributers'}
                                                    key={key}
                                                />
                                            );
                                        })
                                    )}
                                </Accordion.Body>
                            </div>
                        </Accordion.Item>
                    </Accordion>

                    <Accordion className="contributer-accordion" >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="header">Faculty</h4>
                            </Accordion.Header>
                            <div className="accordion-body-container">
                                <Accordion.Body >
                                    <Col md={12} sm={12} xs={12}>
                                        <Row>
                                            <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="add-component">
                                                <Button
                                                    onClick={() =>
                                                        addProjectComponent(myProps, db, ref(db, myProps.pathName), true)}>
                                                    <i className="bi bi-plus-lg" />
                                                </Button>
                                            </Col>

                                        </Row>
                                    </Col>
                                    {(myProps.data && typeof myProps.data.facultyMembers === 'object') && (
                                        Object.keys(myProps.data.facultyMembers).map((key) => {
                                            const faculty = myProps.data.facultyMembers[key];
                                            return (
                                                <EditableFaculty
                                                    data={faculty}
                                                    pageOrder={faculty.pageOrder}
                                                    nestedOrder={faculty.nestedOrder}
                                                    componentKey={key}
                                                    pathName={myProps.pathName + "/" + myProps.componentKey + '/facultyMembers'}
                                                    key={key}
                                                />
                                            );
                                        })
                                    )}
                                </Accordion.Body>
                            </div>
                        </Accordion.Item>
                    </Accordion>

                </Container>
            </Container >
        </div >
    )
}

export default EditableProject
