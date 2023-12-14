
import { ref, onValue, getDatabase } from "firebase/database";
import {useEffect, useState } from "react";
import { parseDataToComponents } from "../utils/parseAndRenderComponents";
import { useLocation} from "react-router-dom";

// Page for individual faculty member's
function FacultyPage() {
    const [snapShot, setSnapshot] = useState({});
    const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>([]);

    // Gets faculty member's id
    const location = useLocation();
    const { id } = location.state as { id: string };

    const db = getDatabase();

    // Gets all of the components based on the passed ID
    useEffect(() => {

        if (!id) {
            return; // Don't proceed without the ID
        }

        const projects = ref(db, `pages/${id}/components`);

        // Stores a listener for the database in a useState variable
        const unsubscribe = onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });

        // Cleanup function to unsubscribe when component unmounts or ID changes
        return () => {
            unsubscribe();
        };
    }, [id, db]);

    // Calls function that parses database information so it can be converted into project list and event carousel components
    useEffect(() => {
        parseDataToComponents(snapShot, setRenderedComponents, id);
    }, [id, snapShot]);

    return (
        <div style={{paddingBottom: '150px'}}>
            {renderedComponents}
        </div >
    )
}

export default FacultyPage
