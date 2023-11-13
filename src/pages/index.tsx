import { Row, Col, Button, Container } from 'react-bootstrap';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { useState, useEffect, MouseEventHandler, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDraftModal from '../components/ConfirmDraftModal';
import { AuthContext } from '../App';
import { parseDataToComponents} from '../utils/parseAndRenderComponents';


// The home page shows users the projectlist and events carousel 
const Home = () => {
    const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>([]);
    const [showDraftModal, setShowDraftModal] = useState<boolean>(false);
    const [snapShot, setSnapshot] = useState<object>({});
    const db = getDatabase();

    // https://reactnavigation.org/docs/use-navigation/#:~:text=useNavigation%20is%20a%20hook%20which,of%20a%20deeply%20nested%20child.
    const navigate = useNavigate();
    const user = useContext(AuthContext);

   

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
        parseDataToComponents(snapShot, setRenderedComponents);
    }, [snapShot]);


   

    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    //Draft logic for either creating a new draft or showing a modal
    const handleEditButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        // Access the database and gets the user's draft information
        const drafts = ref(db, `drafts/${user.name}/homepage`);

        // Get draft information
        get(drafts)
            .then((snapshot) => {
                // If the user doesn't already have a draft for a specific page
                if (snapshot.val() === null) {
                    createNewDraft(true);
                }
                // If the user DOES have a draft for a specific page, then show a modal to ask them what they would like to do
                else {
                    setShowDraftModal(true);
                }
            })
            .catch((error) => {
                console.error('Error reading data: ', error);
            });
    };

    // Handles the creation of a new draft if the user chooses to create one,
    // otherwise, directs the user to the edit page for the existing draft
    function createNewDraft(makeNewDraft: boolean) {

        // If a new draft should be created
        if (makeNewDraft) {

            // Delete the old draft 
            const valueRef = ref(db, `drafts/${user.name}/homepage/components/`);
            set(valueRef, null);

            // Iterate through the components in the specific page you want to edit and 
            //create a draft with all that component information under a specific user's EMAIL
            for (const [key, value] of Object.entries(snapShot)) {

                // TODO: Have drafts underneath the user.UID. not their name
                const myRef = ref(db, `drafts/${user.name}/homepage/components/` + key);
                
                // Set the component information at the specified key in the database
                set(myRef, value)
                    .then(() => {
                        // Data has been successfully added to the database
                        console.log('Data added successfully!');
                    })
                    .catch((error) => {
                        // Handle errors here
                        console.error('Error adding data: ', error);
                    });
            }
        }
        // Navigate to the edit page
        navigate('/edit', { state: { pathName: `drafts/${user.name}/homepage/components` } });
    }


    return (
        <div>
            {/* If the user has already decided to edit and the user isnt null */}
            {showDraftModal && user !== null &&
                <ConfirmDraftModal show={showDraftModal}
                    onHide={() => setShowDraftModal(false)}
                    onCreateDraft={(value) => createNewDraft(value)}
                    name={user.name} />
            }
            {renderedComponents}
            {/* Render edit button conditionally */}
            {user !== null &&
                <Container>
                    <Row>
                        {/* Edit button. TODO: Render conditionally based on ownership of a page */}
                        <Col md={12} style={{ textAlign: 'right' }} className='edit-button'>
                            <Button onClick={handleEditButtonClick}>Edit Page</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    );
};

export default Home;
