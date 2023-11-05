import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import EditableComponent from '../components/EditableComponent';
import Header from '../components/Header';

const EditPage = () => {
    // https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react
    const location = useLocation();
    const { pathName } = location.state as { pathName: string };
    const [editableComponents, setEditableComponents] = useState('');
    const [snapshotTemp, setSnapshot] = useState({});
    
    // Gets the project information from the database
    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, 'pages/homepage/components/0/projectList');
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
            console.log(snapshot.val());
        });
    }, []);

    // Parse database information and update local state
    useEffect(() => {
        const jsonString = JSON.stringify(snapshotTemp, null, 2);
        console.log(jsonString);
        const arr=[];
        for (const [, value] of Object.entries(snapshotTemp)) {

            const js = JSON.stringify(value, null, 2);
            arr.push(js)
        }
        setEditableComponents(arr[1]);
    }, [snapshotTemp]);

     // https://firebase.google.com/docs/database/web/read-and-write
     function editDatabase(path: string, data: string) {
        const db = getDatabase();
        set(ref(db, path), JSON.parse(data));
    }

       // https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
       function deleteFromDatabase(path: string) {
        const db = getDatabase();
        const chatRef = ref(db,path);
        set(chatRef, null);
    }

    // Update local state when the text area content changes
    const handleTextAreaChange = (event) => {
        setEditableComponents(event.target.value);
    };

    // Save changes back to the database
    const handleSaveButtonClick = () => {
        editDatabase('pages/homepage/components/0/projectList', editableComponents);
    };


    return (
        <div>
                 <Header title="Edit Page"/>
            <h1>Edit Page</h1>
            <h1> {pathName} </h1>
            <textarea cols={200} value={editableComponents} onChange={handleTextAreaChange} />
            <button onClick={handleSaveButtonClick}>Save</button>
        </div>
    );
};

export default EditPage;
