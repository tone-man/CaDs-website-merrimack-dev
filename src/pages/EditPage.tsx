import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router-dom';
import EditableComponent from '../components/EditableComponent';
import Header from '../components/Header';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../css/editPage.css'

// The edit page is what enables users to edit the components of a page they have owndership of
const EditPage = () => {

    // https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react
    // Reads in param that was passed in (Tells users the path to look at for the database)
    const location = useLocation();
    const { pathName } = location.state as { pathName: string};
    const [updatedComponents, setUpdatedComponents] = useState<string[]>([]);
    const [snapshotTemp, setSnapshot] = useState({});
    const [isSaveable, setisSaveable] = useState(true);
    const navigate = useNavigate();

    // Gets the project information from the database
    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, pathName);
        // Sets usetate variable to a listener to the database
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });
    }, []);

    // Parses database information and updates the updated components array
    useEffect(() => {
        const arr = [];

        // https://flexiple.com/javascript/loop-through-object-javascript
        // Loop through the database information and stringify the objects so they can be displayed
        if (snapshotTemp) {
            for (const [, value] of Object.entries(snapshotTemp)) {
                const json = JSON.stringify(value, null, 2);
                arr.push(json);
            }
            setUpdatedComponents(arr);
        }
    }, [snapshotTemp]);

    // https://firebase.google.com/docs/database/web/read-and-write
    // Edits database based on JSON passed in
    function editDatabase(path: string, data: string) {
        const db = getDatabase();
        const parsedData = JSON.parse(data);
        set(ref(db, path), parsedData);
    }

    // https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
    // function deleteFromDatabase(path: string) {
    //     const db = getDatabase();
    //     const chatRef = ref(db, path);
    //     set(chatRef, null);
    // }

    // Handle changes to JSON in the editable components
    const handleComponentChange = (index: number, newData: string) => {
        setisSaveable(false);
        const uc = [...updatedComponents];
        uc[index] = newData;
        setUpdatedComponents(uc);
    };

    // Goes through each of the editable components and writes them to their specific spot in the database.
    const handleSave = () => {
        updatedComponents.forEach((component, index) => {
            const path = `pages/homepage/components/${index}`;
            editDatabase(path, component);
        });
        navigate('/');
    };



    return (
        <div>
            <Header title={"Edit Page"} />
            <Container>
                <Row>
                    <Col md={12} style={{ margin: 'auto', textAlign: 'center', paddingTop: '50px' }}>
                        <h1>Editable components below</h1>
                    </Col>
                </Row>
                {
                    // Maps each of the project elements in the projects array to a project card
                    updatedComponents.map((component, index) => (
                        <EditableComponent key={index}
                            data={component}
                            onDataChange={(newData) => handleComponentChange(index, newData)}
                        />
                    ))
                }
                <Row>
                    <Col md={12} style={{ textAlign: 'right' }} className='save-button'>
                        {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                        <Button disabled={isSaveable} onClick={() => handleSave()}>Save</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditPage;
