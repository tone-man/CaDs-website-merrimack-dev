import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set, push, child, update, get } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router-dom';
import EditableComponent from '../components/EditableComponent';
import Header from '../components/Header';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import '../css/editPage.css'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import eventTemplate from '../utils/events.json';
import textAreaTemplate from '../utils/textarea.json'
import accordionTemplate from '../utils/accordion.json'
import EditableTextArea from '../components/EditableTextArea';
import EditableCarousel, { editableComponentProps } from '../components/EditableCarousel';
import EditableFacultyHeader from '../components/EditableFacultyHeader';

/**
 * The EditPage component enables users to edit the components of a page they have ownership of.
 * This page provides the interface for users to modify and manage components within a specific page.
 */
const EditPage = () => {

    // https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react
    // Reads in param that was passed in (Tells users the path to look at for the database)
    const location = useLocation();
    const { pathName } = location.state as { pathName: string };

    const [updatedComponents, setUpdatedComponents] = useState();
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [snapshotTemp, setSnapshot] = useState({});
    const [cannotSubmit, setCannotSubmit] = useState(false);

    const navigate = useNavigate();
    const db = getDatabase();

    /**
    * Effect hook to fetch project information from the database and update state.
    * Runs upon initial rendering of page
    */
    useEffect(() => {
        // Create a reference to the database using the provided pathName
        const componentsRef = ref(db, pathName);

        // Set up a listener to the database using onValue
        // The listener will update the state variable 'snapshot' with the retrieved data
        onValue(componentsRef, (snapshot) => {
            // Update the state variable 'snapshot' with the data from the database
            setSnapshot(snapshot.val());
        });
    }, []);

     /**
    * Effect hook to fetch project information from the database and update state.
    * Runs upon initial rendering of page
    */
     useEffect(() => {
            console.log(cannotSubmit, ' disabled or not here')
    }, [cannotSubmit]);



    /**
    * Effect hook to process database information and create editable components.
    * Runs whenever 'snapshotTemp' or values in pages change.
    */
    useEffect(() => {
        let notvalid = 0;
        for (const [key, value] of Object.entries(snapshotTemp)) {
            if (value.type!=='project') {
                for (const [newkey, newvalue] of Object.entries(value)) {
                    console.log(newvalue);
                    if (newvalue==='') {
                        notvalid++;
                        setCannotSubmit(true);
                       break
                    } else {
                        if (notvalid ===0){
                            setCannotSubmit(false)
                        }
                    }
                }
            }
        }





        // Initialize an array to store components
        const arr = [];
        let temp = [];

        // Check if 'snapshotTemp' has data
        if (snapshotTemp) {
            // Loop through each value in the database
            const events: editableComponentProps[][] = [];
            for (const [key, value] of Object.entries(snapshotTemp)) {
                if (key !== 'submitted') {

                    // Push an EditableComponent with specific props for each value
                    if (value.type === 'text' || value.type === 'accordion') {
                        console.log('text')
                        arr.push(
                            <EditableTextArea
                                key={key}
                                pageOrder={value.pageOrder}
                                nestedOrder={value.nestedOrder}
                                componentKey={key}
                                data={value}
                                pathName={pathName}
                                type={value.type}
                            />
                        );
                    }
                    else if (value.type === 'event') {
                        if (events[value.pageOrder] === undefined) {
                            events[value.pageOrder] = []
                        }
                        if (events[value.pageOrder]) {
                            events[value.pageOrder].push(
                                {
                                    pageOrder: value.pageOrder,
                                    nestedOrder: value.nestedOrder,
                                    data: value,
                                    componentKey: key,
                                    pathName: pathName
                                })
                        }
                    }
                    else if (value.type ==='header'){
                        arr.push(
                            <EditableFacultyHeader
                                key={key}
                                pageOrder={value.pageOrder}
                                nestedOrder={value.nestedOrder}
                                componentKey={key}
                                data={value}
                                pathName={pathName}
                            />
                        );
                    }
                    else {
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
                }
            }
            {
                // Maps each of the events in the events array to a carousel item
                events.map((array, index) => (
                    <>
                        {
                            arr.push(<EditableCarousel key={index} array={events[index]} pageOrder={events[index][0].pageOrder} type={'event'} />)
                        }
                    </>
                ))
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


    /**
     * Writes the changes made to each editable component to their specific spot in the database.
     * Marks the draft as submitted by updating the 'submitted' flag.
     */
    const handleSave = () => {
        console.log("got in")

        const draft = ref(db, `drafts/Administrator/homepage/components`);

        // Retrieve data from the database
        get(draft)
            .then((snapshot) => {
                console.log(snapshot.val(), 'SNAPSHOT HERE')
                //   // If no draft exists at the specified path, create a new draft
                if (snapshot.val() !== null) {
                    const valueRef = ref(db, `pages/homepage/components`);
                    console.log(valueRef, 'value red')
                    // Set the entire path to null to clear any existing data
                    // set(valueRef, null);

                    // For every single component in the snapshot
                    for (const [key, value] of Object.entries(snapshot.val())) {
                        console.log(`pages/homepage/components/` + key)
                        const myRef = ref(db, `pages/homepage/components/` + key);
                        // console.log(`pages/homepage/components/` + key, 'MY REFFF')

                        // Add it to the drafts with the same exact key
                        set(myRef, value)
                            .then(() => {
                                console.log('Data added successfully!');
                            })
                            .catch((error) => {
                                console.error('Error adding data: ', error);
                            });
                    }
                }
                //     // Else display a modal to ask the user what to do
                //     setShowDraftModal(true);
                // }
            })
            .catch((error) => {
                console.error('Error reading data: ', error);
            });
















        // const dbRef = ref(getDatabase());

        // // Create an object to store updates for each editable component
        // const updates = {};

        // // Mark the draft as submitted by updating the 'submitted' flag
        // updates[`${pathName}/submitted/`] = true;

        // // Perform the update in the database
        // update(dbRef, updates)

        // // Navigate away to the home page
        // navigate('/');
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

    /**
     * Adds a new component to the database based on the specified component type.
     * @param componentType - The type of component to be added (e.g., 'project' or 'event' (WILL BE MORE IN FUTURE !)).
     * Reference: https://firebase.google.com/docs/database/web/read-and-write#basic_write
     */
    function addComponent(componentType: string) {
        let newObj = undefined;

        // Determine the template based on the component type
        if (componentType === 'event') {
            newObj = eventTemplate;
        }
        else if (componentType === 'textarea') {
            newObj = textAreaTemplate;
        }
        else if (componentType === 'accordion') {
            newObj = accordionTemplate;
        }

        let maxPageOrder = 0;

        if (newObj) {
            // Iterate through existing components to find the maximum nesting order for the same type
            newObj.nestedOrder = 0;
            for (const [, value] of Object.entries(snapshotTemp)) {
                if (value) {
                    if (maxPageOrder <= value.pageOrder) {
                        maxPageOrder = value.pageOrder + 1;
                    }
                }
            }
            newObj.pageOrder = maxPageOrder;
        }
        // else {
        //     newObj = projectTemplate;
        //     // Iterate through existing components to find the maximum nesting order for the same type
        //     for (const [, value] of Object.entries(snapshotTemp)) {
        //         if (value) {
        //             newObj.pageOrder = 0;
        //             if (value.pageOrder === 0) {
        //                 if (maxNesting < value.nestedOrder) {
        //                     maxNesting = value.nestedOrder + 1;
        //                     newObj.nestedOrder = maxNesting;

        //                 }
        //             }
        //         }
        //     }
        // }

        // Generate a new key for the new component
        const newPostKey = push(child(ref(db), pathName)).key;

        // Prepare updates for the database
        const updates = {};
        updates[pathName + '/' + newPostKey] = newObj;

        // Perform the update in the database
        return update(ref(db), updates);

    }

    return (
        <div>
            <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={handleCancel} name={'this draft'} />
            <Header title={"Edit Page"} />
            <Container style={{ paddingTop: '40px' }}>
                <Row>
                    <Col md={9} sm={9} xs={9} style={{ textAlign: 'left' }} className='save-button'>
                        <Dropdown>
                            <Dropdown.Toggle  id="dropdown-basic">
                                Add a Component
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => addComponent('event')}>Event Carousel</Dropdown.Item>
                                <Dropdown.Item onClick={() => addComponent('textarea')}>Text Box</Dropdown.Item>
                                <Dropdown.Item onClick={() => addComponent('accordion')}>DropDown Box</Dropdown.Item>
                                {pathName.includes('homepage') &&
                                    <Dropdown.Item onClick={() => addComponent('project')}>Project</Dropdown.Item>
                                }

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                {updatedComponents}
                <Container fluid style={{width: '90%'}}>
                <Row>
                    <Col md={9} sm={9} xs={6} style={{ textAlign: 'right' }} className='save-button'>
                        {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                        <Button onClick={() => setShowDeletionModal(true)}>Delete Draft</Button>
                    </Col>
                    <Col md={3} sm={3} xs={6} style={{ textAlign: 'left' }} className='save-button'>
                        {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                        <Button disabled={cannotSubmit} onClick={() => handleSave()}>Request Changes</Button>
                    </Col>
                </Row>
                </Container>
            </Container>
        </div>
    );
};

export default EditPage;
