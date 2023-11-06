import React, { SetStateAction, useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import EditableComponent from '../components/EditableComponent';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../css/editPage.css'

const EditPage = () => {
    // https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react
    // const location = useLocation();
    // const { pathName } = location.state as { pathName: string };
    // const [editableComponents, setEditableComponents] = useState<string[]>([]);
    // const [updatedComponents, setUpdatedComponents] = useState<string[]>([]);
    // const [snapshotTemp, setSnapshot] = useState({});

    // // Gets the project information from the database
    // useEffect(() => {
    //     const db = getDatabase();
    //     const projects = ref(db, 'pages/homepage/components');
    //     onValue(projects, (snapshot) => {
    //         setSnapshot(snapshot.val());
    //     });
    // }, []);

    // // Parse database information and update local state
    // useEffect(() => {
    //     const arr = [];

    //     if (snapshotTemp) {
    //         for (const [, value] of Object.entries(snapshotTemp)) {
    //             for (const key in value) {
    //                 const obj = value[key];
    //                 if (typeof obj === 'object' && obj !== null) {
    //                     Object.values(obj).forEach(item => {
    //                         const json = JSON.stringify(item, null, 2);
    //                         arr.push(json);
    //                     });
    //                 }
    //             }
    //         }

    //         setUpdatedComponents(arr);
    //     }
    // }, [snapshotTemp]);

    // // https://firebase.google.com/docs/database/web/read-and-write
    // function editDatabase(path: string, data: string) {
    //     const db = getDatabase();
    //     const parsedData = JSON.parse(data);
    //     set(ref(db, path), parsedData);
    // }

    // // https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
    // function deleteFromDatabase(path: string) {
    //     const db = getDatabase();
    //     const chatRef = ref(db, path);
    //     set(chatRef, null);
    // }

    // // Handle changes in the editable components
    // const handleComponentChange = (index: number, newData: string) => {
    //     // console.log(newData, 'here')
    //     const uc = [...updatedComponents];
    //     uc[index] = newData;
    //     setUpdatedComponents(uc);
    // };

    // const handleSave = () => {
    //     updatedComponents.forEach((component, index) => {
    //         const path = `pages/homepage/components/${index}`;
    //         editDatabase(path, component);
    //     });
    // };



    return (
        <div>

            <Header title="Edit Page" />
            <Container>
                <h1>Editable components below</h1>
                <h1> {pathName} </h1>
                {/* {
                    // Maps each of the project elements in the projects array to a project card
                    updatedComponents.map((component, index) => (
                        <EditableComponent key={index}
                            data={component}
                            onDataChange={(newData) => handleComponentChange(index, newData)}
                        />
                    ))
                } */}
                <Row>
                    <Col md={12} style={{ textAlign: 'right' }} className='save-button'>
                        {/* <a href='/'> */}
                        {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                        <Button onClick={() => handleSave()}>Save</Button>
                        {/* </a> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditPage;
