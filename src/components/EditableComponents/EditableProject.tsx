import { getDatabase, ref } from "firebase/database"
import { Container, Col, Row, Button, Accordion } from "react-bootstrap"
import { useState, useEffect } from "react"

import '../../css/editableCSS/editableNested.css'
import '../../css/editableCSS/editableProject.css'

import EditableFaculty from "./EditableFaculty"
import EditableFormComponent from "./EditableFormComponent"
import EditableContributers from "./EditableContributers"
import DeleteConfirmationModal from "../DeleteConfirmationModal"
import { handleTextAreaChange, reorderNestedComponents, deleteNestedComponent, getMaxNestedOrder, addProjectComponent } from '../../utils/editingComponents';
import EditableImageForm from "./EditableImageForm"

import '../../css/homepageCSS/imageModal.css'

export interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: any,
    componentKey: string,
    pathName: string,
    addToast: (message: string, type: 'success' | 'warning' | 'danger') => void;
}

/**
 * Component for displaying and editing project data
 * Allows edit and deletion privileges to users.
 */
function EditableProject(myProps: editableComponentProps) {

    const db = getDatabase();
    const myRef = ref(db);

    // Create useStates for all data that we will be displaying
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const [link, setLink] = useState('');
    const [image, setImage] = useState('');
    const [imageDescription, setImageDescription] = useState('');

    const [buttons, setButtons] = useState<JSX.Element | null>(null);
    const [lastNestedOrder, setLastNestedOrder] = useState<number | null>(null);
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);

    // Initialize usestates using data from props in the useEffect (once on initial render).
    useEffect(() => {
        setDescription(myProps.data.description);
        setTitle(myProps.data.title);
        setLink(myProps.data.projectLink);
        setImage(myProps.data.image);
        setImageDescription(myProps.data.imageDescription)
    }, []);

    // Get max nested order for specific component
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
                    <Col md={9} sm={12} xs={12} className='nested-component-title' style={{ color: 'white' }}>
                        <h1 dangerouslySetInnerHTML={{ __html: myProps.data.title }}></h1>
                    </Col>
                    <Col md={3} sm={12} xs={12}>
                        <Row>
                            <Col className="reorder-nested-component" md={6} sm={5} xs={5} style={{ textAlign: 'right' }}>
                                <Button
                                    disabled={myProps.nestedOrder === 0}
                                    onClick={() =>
                                        reorderNestedComponents(true, myRef, myProps)} >
                                    <i className="bi bi-arrow-up-short">
                                    </i>
                                </Button>
                            </Col>
                            <Col className="reorder-nested-component" md={6} sm={5} xs={5} style={{ textAlign: 'left' }}>
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
        deleteNestedComponent(myProps, db, myProps.addToast, "project")
        setShowDeletionModal(false);
    }
    let contributorsArray: { key: string; contributor: any }[] = [];
    let facultyArray: { key: string; facultyMember: any }[] = [];

    //Sorts the contributers by nested order
    // Reference: https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
    if (myProps.data.contributers && Object.keys(myProps.data.contributers).length !== 0) {

        contributorsArray = Object.keys(myProps.data.contributers).map((key) => ({
            key,
            contributor: myProps.data.contributers[key],
        }));

        contributorsArray = contributorsArray.sort((a, b) => {
            return a.contributor.nestedOrder - b.contributor.nestedOrder;
        });

    }

    //Sorts the contributers by nested order
    // Reference: https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
    if (myProps.data.facultyMembers && Object.keys(myProps.data.facultyMembers).length !== 0) {
        facultyArray = Object.keys(myProps.data.facultyMembers).map((key) => ({
            key,
            facultyMember: myProps.data.facultyMembers[key],
        }));

        facultyArray = facultyArray.sort((a, b) => {
            return a.facultyMember.nestedOrder - b.facultyMember.nestedOrder;
        });
    }

    return (
        <div>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeletionModal(false)}
                onConfirm={remove}
                name={'this ' + myProps.data.type} />
            <Container fluid className='background-container'>
                <Container fluid className='text-editable-container'>
                    {buttons}
                    <Container fluid className='styling'>
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
                                delete={lastNestedOrder !== 0}
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
                            <EditableImageForm
                                changedValue='/image'
                                myRef={myRef}
                                value={image}
                                setValue={setImage}
                                pathName={myProps.pathName}
                                componentKey={myProps.componentKey}
                                label="Image URL"
                                handleTextAreaChange={handleTextAreaChange} />
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

                        {/*Go through and map each contributer object to an editable contributer component  */}
                        <Accordion className="contributer-accordion" >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <h4 className="header">Contributers</h4>
                                </Accordion.Header>
                                <div className="accordion-body-container">
                                    <Accordion.Body>
                                        <Row>
                                            <Col md={12} sm={12} xs={12}>
                                                <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="add-component">
                                                    <Button
                                                        onClick={() =>
                                                            addProjectComponent(myProps, db, true, myProps.addToast)}>
                                                        <i className="bi bi-plus-lg" />
                                                    </Button>
                                                </Col>
                                            </Col>
                                            {contributorsArray.length > 0 && (
                                                contributorsArray.map(({ key, contributor }) => (
                                                    <EditableContributers
                                                        data={contributor}
                                                        pageOrder={contributor.pageOrder}
                                                        nestedOrder={contributor.nestedOrder}
                                                        componentKey={key}
                                                        pathName={`${myProps.pathName}/${myProps.componentKey}/contributers`}
                                                        key={key}
                                                        addToast={myProps.addToast}
                                                    />
                                                ))
                                            )}
                                        </Row>
                                    </Accordion.Body>
                                </div>
                            </Accordion.Item>
                        </Accordion>

                        {/*Go through and map each faculty object to an editable facultty component  */}
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
                                                            addProjectComponent(myProps, db, false, myProps.addToast)}>
                                                        <i className="bi bi-plus-lg" />
                                                    </Button>
                                                </Col>

                                            </Row>
                                        </Col>
                                        {facultyArray.length > 0 && (
                                            facultyArray.map(({ key, facultyMember }) => (
                                                <EditableFaculty
                                                    data={facultyMember}
                                                    pageOrder={facultyMember.pageOrder}
                                                    nestedOrder={facultyMember.nestedOrder}
                                                    componentKey={key}
                                                    pathName={`${myProps.pathName}/${myProps.componentKey}/facultyMembers`}
                                                    key={key}
                                                    addToast={myProps.addToast}
                                                />
                                            ))
                                        )}
                                    </Accordion.Body>
                                </div>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </Container>
            </Container >
        </div >
    )
}

export default EditableProject
