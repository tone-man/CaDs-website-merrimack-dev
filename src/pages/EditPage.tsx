import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set, push, child, update } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router-dom';
import EditableComponent from '../components/EditableComponent';
import Header from '../components/Header';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import '../css/editPage.css'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import projectTemplate from '../utils/project.json';
import eventTemplate from '../utils/events.json';


// The edit page is what enables users to edit the components of a page they have owndership of
const EditPage = () => {

    // https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react
    // Reads in param that was passed in (Tells users the path to look at for the database)
    const location = useLocation();
    const { pathName } = location.state as { pathName: string };

    const [updatedComponents, setUpdatedComponents] = useState();
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [snapshotTemp, setSnapshot] = useState({});

    const navigate = useNavigate();
    const db = getDatabase();

    // FOR TESTING PURPOSES ONLY
    useEffect(() => {
        console.log("draft snap shot has changed", snapshotTemp)
    }, [snapshotTemp]);

    /**
    * Effect hook to fetch project information from the database and update state.
    * Runs upon initial rendering of page
    */
    useEffect(() => {
        // Create a reference to the database using the provided pathName
        const projects = ref(db, pathName);

        // Set up a listener to the database using onValue
        // The listener will update the state variable 'snapshot' with the retrieved data
        onValue(projects, (snapshot) => {
            // Update the state variable 'snapshot' with the data from the database
            setSnapshot(snapshot.val());
        });
    }, []);


    /**
    * Effect hook to process database information and create editable components.
    * Runs whenever 'snapshotTemp' or values in pages change.
    */
    useEffect(() => {
        // Initialize an array to store components
        const arr = [];
        let temp = [];

        // Check if 'snapshotTemp' has data
        if (snapshotTemp) {
            // Loop through each value in the database
            for (const [key, value] of Object.entries(snapshotTemp)) {
                // Push an EditableComponent with specific props for each value
                arr.push(
                    <EditableComponent
                        key={key}
                        pageOrder={value.pageOrder}
                        nestedOrder={value.nestedOrder}
                        componentKey={key}
                        data={value}
                        pathName={pathName}
                    />
                );
            }

            // Sort the array based on 'pageOrder' and 'nestedOrder'
            temp = arr.sort(function (a, b) {
                return (
                    a.props.pageOrder - b.props.pageOrder || a.props.nestedOrder - b.props.nestedOrder
                );
            });

            // Update state variable 'updatedComponents' with the sorted array
            setUpdatedComponents(temp);
        }
    }, [snapshotTemp]);


    // // Goes through each of the editable components and writes them to their specific spot in the database.
    const handleSave = () => {
        console.log("save functionality here")
    };

    /**
    * Handles the cancellation of the editing process.
    * Deletes the draft in the database and navigates the user back to the home page.
    */
    const handleCancel = () => {
        const deletePath = pathName;

        // Create a reference to the database using the provided deletePath
        const valueRef = ref(db, deletePath);

        // Set the data at the specified key in the database to null (deletion)
        set(valueRef, null);

        // Navigate the user back to the home page
        navigate('/');
    };

    // https://firebase.google.com/docs/database/web/read-and-write#basic_write
    function addComponent(componentType: string) {
        let newObj = undefined;
        if (componentType === 'project') {
            newObj = projectTemplate;
        }
        else if (componentType==='event'){
            newObj = eventTemplate;
        }
        let maxNesting = 0;
        if (newObj) {

            for (const [, value] of Object.entries(snapshotTemp)) {
                if (value) {
                    if (value.type === componentType) {
                        if (maxNesting < value.nestedOrder) {
                            maxNesting = value.nestedOrder;
                        }
                        newObj.pageOrder = value.pageOrder;
                    }
                }
            }
            newObj.nestedOrder = maxNesting + 1;

            const newPostKey = push(child(ref(db), pathName)).key;

            const updates = {};
            updates[pathName + '/' + newPostKey] = newObj;

            return update(ref(db), updates);

        }

    }

    return (
        <div>
            <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={handleCancel} name={'this draft'} />
            <Header title={"Edit Page"} />
            <Container style={{ paddingTop: '40px' }}>
                <Row>
                    <Col md={9} sm={9} xs={9} style={{ textAlign: 'left' }} className='save-button'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Add a Component
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => addComponent('event')}>Event</Dropdown.Item>
                                <Dropdown.Item onClick={() => addComponent('project')}>Project</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                {updatedComponents}
                <Row>
                    <Col md={9} sm={9} xs={9} style={{ textAlign: 'right' }} className='save-button'>
                        {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                        <Button onClick={() => setShowDeletionModal(true)}>Delete Draft</Button>
                    </Col>
                    <Col md={3} sm={3} xs={3} style={{ textAlign: 'left' }} className='save-button'>
                        {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                        <Button onClick={() => handleSave()}>Request Changes</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditPage;
