import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import { parseDataToComponents } from '../utils/parseAndRenderComponents';
import Header from '../components/Header';

// The home page shows users the projectlist and events carousel 
const Home = () => {
   
    const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>([]);
    const [snapShot, setSnapshot] = useState<object>({});
    const db = getDatabase();

    // Gets all of the components in the homepage
    // https://firebase.google.com/docs/database/web/read-and-write
    useEffect(() => {
        const projects = ref(db, 'pages/homepage/components');

        // Stores a listener for the database in a useState variable
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });

    }, []);

    // Calls function that parses database information so it can be converted into project list and event carousel components
    useEffect(() => {
        parseDataToComponents(snapShot, setRenderedComponents, undefined);
    }, [snapShot]);

    return (
        <div>
            <Header img={'src/imgs/OBCenter.jpg'} title='Faculty Led Projects' />
            {renderedComponents}
        </div>
    );
};

export default Home;
