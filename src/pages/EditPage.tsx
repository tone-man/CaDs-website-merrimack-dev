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
    const { pathName } = location.state as { pathName: string };
    const [updatedComponents, setUpdatedComponents] = useState<string[][]>([]);
    const [deletedComponents, setDeletedComponents] = useState<string[]>([]);
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
            for (const [key, value] of Object.entries(snapshotTemp)) {
                const json = JSON.stringify(value, null, 2);
                arr.push([key, json, value.nestedOrder, value.pageOrder]);
            }
            setUpdatedComponents(arr);
        }
    }, [snapshotTemp]);

    // https://firebase.google.com/docs/database/web/read-and-write
    // Edits database based on JSON passed in
    function editDatabase(path: string, data: string) {
        const db = getDatabase();
        const parsedData = JSON.parse(data);
        console.log(parsedData, 'parsed Data')
        set(ref(db, path), parsedData);
    }

    // https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
    function deleteFromDatabase(path: string) {
        const db = getDatabase();
        const chatRef = ref(db, path);
        set(chatRef, null);
    }

    // Handle changes to JSON in the editable components
    const handleComponentChange = (index: number, newData: string) => {
        setisSaveable(false);
        const newComponents = [...updatedComponents];
        newComponents[index][1] = newData;
        setUpdatedComponents(newComponents);
    };

    // Goes through each of the editable components and writes them to their specific spot in the database.
    const handleSave = () => {
        deletedComponents.forEach((component) => {
            deleteFromDatabase(component);
        });

        updatedComponents.forEach((component) => {
            const path = `pages/homepage/components/${component[0]}`;
            editDatabase(path, component[1]);
        });
        navigate('/');

    };

    const handleDeletion = (index: number, path: string) => {
        const updatedEdits = [...updatedComponents];
        const currentComp = JSON.parse(updatedComponents[index][1]);

        const pageOrder = currentComp.pageOrder;
        const nestedOrder = currentComp.nestedOrder;
        let count = 0;

        updatedEdits.forEach((component) => {
            if (component[3]===pageOrder){
                count++;
            }
           if (component[3]===pageOrder && component[2] > nestedOrder){
                const tempJSON = JSON.parse(component[1]);
                tempJSON.nestedOrder = (tempJSON.nestedOrder-1);
                component[1]=JSON.stringify(tempJSON);
                component[2]=tempJSON.nestedOrder;
           }
        });

        if (count ===1){
            updatedEdits.forEach((component) => {
               if (component[3]>pageOrder){
                    const tempJSON = JSON.parse(component[1]);
                    tempJSON.pageOrder = (tempJSON.pageOrder-1);
                    component[1]=JSON.stringify(tempJSON);
                    component[3]=tempJSON.pageOrder;
               }
            });
        }
        
        updatedEdits.splice(index, 1); // Removes 1 element at the specified index



        setUpdatedComponents(updatedEdits); // Assuming setUpdatedComponents is a function to update state
        const updatedDeletions = [...deletedComponents, pathName + '/' + path];
        setDeletedComponents(updatedDeletions);

        setisSaveable(false);
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
                        <EditableComponent
                            key={index}
                            componentKey={component[0]}
                            data={component[1]}
                            onDataChange={(newData) => handleComponentChange(index, newData)}
                            onDelete={(path) => handleDeletion(index, path)}
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
