
import { ref, onValue, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";
import { parseDataToComponents } from "../utils/parseAndRenderComponents";


function FacultyPage() {
    const [snapShot, setSnapshot] = useState({});
    const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>([]);
    const db = getDatabase();

    // Gets all of the components in the homepage
    // https://firebase.google.com/docs/database/web/read-and-write
    useEffect(() => {
        const projects = ref(db, 'pages/faculty/components');

        // Stores a listener for the database in a useState variable
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });

    }, []);

    // Calls function that parses database information so it can be converted into project list and event carousel components
    useEffect(() => {
        parseDataToComponents(snapShot, setRenderedComponents);
    }, [snapShot]);

    return (
        <div>
            {renderedComponents}
        </div >
    )
}

export default FacultyPage
