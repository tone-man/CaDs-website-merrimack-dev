import { getDatabase, ref, onValue, set } from 'firebase/database';
import path from 'path';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const EditPage = () => {

    const location = useLocation();
    const { pathName } = location.state as { pathName: string };
    const [snapshotTemp, setSnapshot] = useState({});

    // Gets the project information from the database
    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, 'pages/homepage/components/0/projectList/Automated Lyric Analysis/');
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
            console.log(snapshot.val())
        });
    }, []);


    // Actually parses database information so it can be passed to other components
    // useEffect(() => {


    // }, [snapshotTemp]);


    // https://firebase.google.com/docs/database/web/read-and-write
    function editDatabase(path: string) {
        console.log("in here")
        const db = getDatabase();
        set(ref(db, 'pages/homepage/components/0/projectList/Automated Lyric Analysis/'), {
            title: path
        });
    }

    // https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
    function deleteFromDatabase(path: string) {
        const db = getDatabase();
        const chatRef = ref(db,path);
        set(chatRef, null);
    }

    return (
        <div>
            <h1>Edit Page</h1>
            <h1> {pathName} </h1>
        </div>
    );
};

export default EditPage;