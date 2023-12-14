import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set, push, child, update, get } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';

import '../css/editableCSS/editPage.css';

import Header from '../components/Header';
import DeleteConfirmationModal from '../components/Modals/DeleteConfirmationModal';

import eventTemplate from '../utils/events.json';
import textAreaTemplate from '../utils/textarea.json';
import accordionTemplate from '../utils/accordion.json';
import contactTemplate from '../utils/contact.json';
import useToastContext from '../components/toasts/useToastContext';
import { createEditableRenderArray } from '../utils/parseAndRenderComponents';


// Define an interface for the structure of the nested components
interface valueType {
    pageOrder: number
    nestedOrder: number
    data: unknown,
    componentKey: string,
    pathName: string,
    type: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdatesType = { [key: string]: any };


/**
 * The EditPage component enables users to edit the components of a page they have ownership of.
 * This page provides the interface for users to modify and manage components within a specific page.
 */
const EditPage = () => {
    const addToast = useToastContext();

    // https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react
    // Reads in param that was passed in (Tells users the path to look at for the database)
    const location = useLocation();
    const { pathName } = location.state as { pathName: string };

    const [updatedComponents, setUpdatedComponents] = useState<JSX.Element[] | undefined>(undefined);
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [componentsSnapshot, setComponentsSnapshot] = useState({});
    const [cannotSubmit, setCannotSubmit] = useState(false);

    const navigate = useNavigate();
    const db = getDatabase();

    /**
    * Effect hook to fetch component information from the database and update state.
    * Runs upon initial rendering of page
    */
    useEffect(() => {
        const componentsRef = ref(db, pathName);

        // Set up a listener to the database using onValue
        // The listener will update the state variable 'snapshot' with the retrieved database data
        onValue(componentsRef, (snapshot) => {
            setComponentsSnapshot(snapshot.val());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /**
    * Effect hook to process database information and create editable components.
    * Runs whenever 'componentSnapshot' or values in the page changes.
    */
    useEffect(() => {
        // Check if the user has all values entered, if not don't allow the user to submit
        let notvalid = 0;
        for (const [key, value] of Object.entries(componentsSnapshot)) {
            const nestedValue = value as valueType;
            // If a value doesn't have text, don't allow the user to submit
            for (const [nk, newValue] of Object.entries(nestedValue)) {
                if (typeof newValue === 'object') {
                    // Iterate through the keys of newValue
                    Object.keys(newValue).forEach(k => {
                        
                        // Access properties of newValue[key]
                        const entry = newValue[k];

                        // Check if entry is an object and iterate through its keys
                        if (typeof entry === 'object') {
                            Object.keys(entry).forEach(innerK => {
                                // console.log(innerK,' this is innerK')
                                if (!hasVisibleText(entry[innerK])) {
                                    notvalid++;
                                    setCannotSubmit(true);
                                    return
                                } else {
                                    if (notvalid === 0) {
                                        setCannotSubmit(false)
                                    }
                                }
                            })
                        }
                    })
                }
                else {
                    if (!hasVisibleText(newValue) && nk !=='projectLink' && nk !=='imgSource') {
                        notvalid++;
                        setCannotSubmit(true);
                        break
                    } else {
                        if (notvalid === 0) {
                            setCannotSubmit(false)
                        }
                    }
                }
            }
        }
        createEditableRenderArray(componentsSnapshot, setUpdatedComponents, pathName, addToast);

    }, [addToast, componentsSnapshot, pathName]);


    // Reference: https://stackoverflow.com/questions/34673544/sanitize-html-string-without-using-dangerouslysetinnerhtml-for-length-check
    function hasVisibleText(html: string): boolean {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.innerText.trim().length > 0;
    }

    /**
     * Writes the changes made to each editable component to their specific spot in the database.
     * Marks the draft as submitted by updating the 'submitted' flag.
     */
    const handleSave = () => {

        const splitString = pathName.split('/');
        const newPathName = "pages/" + splitString.slice(2).join('/');
        const draft = ref(db, pathName);

        // Retrieve data from the database
        get(draft)
            .then((snapshot) => {
                //   // If no draft exists at the specified path, create a new draft
                if (snapshot.val() !== null) {
                    const valueRef = ref(db, newPathName);
                    // Set the entire path to null to clear any existing data
                    set(valueRef, null);

                    // For every single component in the snapshot
                    for (const [key, value] of Object.entries(snapshot.val())) {
                        const myRef = ref(db, newPathName + "/" + key);
                        // Add it to the drafts with the same exact key
                        set(myRef, value)
                            .then(() => {
                                set(draft, null);
                                console.log('Data added successfully!');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                navigate('/dashboard');
                            })
                            .catch((error) => {
                                addToast('Error occured when attempting to publish draft', 'danger')
                                console.error('Error adding data: ', error);
                            });
                    }
                }
            })
            .catch((error) => {
                console.error('Error reading data: ', error);
            });
    }


    /**
    * Handles the cancellation of the editing process.
    * Deletes the draft in the database and navigates the user back to the home page.
    * Reference: https://firebase.google.com/docs/database/web/read-and-write#basic_write
    */
    const handleCancel = () => {
        const deletePath = pathName;
        const valueRef = ref(db, deletePath);

        // Set the data at the specified key in the database to null (deletion)
        set(valueRef, null);

        // Navigate the user back to the home page
        addToast("Successfully deleted draft", 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/dashboard');
    };

    /**
     * Adds a new component to the database based on the specified component type.
     * @param componentType - The type of component to be added (e.g., 'project' or 'event').
     * Reference: https://firebase.google.com/docs/database/web/read-and-write#basic_write
     */
    function addComponent(componentType: string) {
        let newObj = undefined;

        // Determine the template based on the component type
        if (componentType === 'event carousel') {
            newObj = eventTemplate;
        }
        else if (componentType === 'text area') {
            newObj = textAreaTemplate;
        }
        else if (componentType === 'accordion') {
            newObj = accordionTemplate;
        }
        else if (componentType === 'contact template') {
            newObj = contactTemplate;
        }

        let maxPageOrder = 0;

        if (newObj) {
            // Iterate through existing components to find the maximum page order
            newObj.nestedOrder = 0;
            for (const [, value] of Object.entries(componentsSnapshot)) {
                const newValue = value as valueType;
                if (newValue) {
                    if (maxPageOrder <= newValue.pageOrder) {
                        maxPageOrder = newValue.pageOrder + 1;
                    }
                }
            }
            newObj.pageOrder = maxPageOrder;
        }
        // Generate a new key for the new component
        const newPostKey = push(child(ref(db), pathName)).key;

        // Prepare updates for the database
        const updates: UpdatesType = {};
        updates[pathName + '/' + newPostKey] = newObj;

        addToast(`Successfully added ${componentType} component`, "success");

        // Perform the update in the database
        return update(ref(db), updates);
    }

    return (
        <div>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeletionModal(false)}
                onConfirm={handleCancel}
                name={'this draft'} />
            <Header title={"Edit Page"} />
            <Container fluid className='edit-container'>
                <Row>
                    <Col md={9} sm={9} xs={9} style={{ textAlign: 'left' }} className='save-button'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                Add a Component
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => addComponent('event carousel')}>Event Carousel</Dropdown.Item>
                                <Dropdown.Item onClick={() => addComponent('text area')}>Text Box</Dropdown.Item>
                                <Dropdown.Item onClick={() => addComponent('accordion')}>DropDown Text</Dropdown.Item>
                                <Dropdown.Item onClick={() => addComponent('contact template')}>Contact Information Template</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                {updatedComponents}
                <Container fluid>
                    <Row>
                        <Col md={9} sm={9} xs={6} style={{ textAlign: 'right' }} className='save-button'>
                            {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                            <Button onClick={() => setShowDeletionModal(true)}>Delete Draft</Button>
                        </Col>
                        <Col md={3} sm={3} xs={6} style={{ textAlign: 'left' }} className='save-button'>
                            <Button disabled={cannotSubmit} onClick={() => handleSave()}>Publish Changes</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

export default EditPage;
