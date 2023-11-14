
import { ref, onValue, getDatabase } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { parseDataToComponents } from "../utils/parseAndRenderComponents";
import { Container, Row, Col, Button } from "react-bootstrap";
import ConfirmDraftModal from "../components/ConfirmDraftModal";
import { handleEditButtonClick, createNewDraft } from '../utils/createNewDraft';
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";


function FacultyPage() {
    const [snapShot, setSnapshot] = useState({});
    const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>([]);
    const [showDraftModal, setShowDraftModal] = useState<boolean>(false);
    const user = useContext(AuthContext);
    const db = getDatabase();
    const navigate = useNavigate();

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

       //  Wrapper function for handling the click event on the "Edit Page" button.
       const handleEditButtonClickWrapper = () => {
        handleEditButtonClick(db, snapShot, createNewDraftWrapper, setShowDraftModal, navigate, `drafts/${user.name}/faculty`);
    };

    //  Wrapper function for handling the create new draft
    const createNewDraftWrapper = (makeNewDraft: boolean) => {
        createNewDraft(makeNewDraft, db, snapShot, navigate, `drafts/${user.name}/faculty/components`);
    };

    return (
        <div>
            {/* If the user has already decided to edit and the user isnt null */}
            {showDraftModal && user !== null &&
                <ConfirmDraftModal show={showDraftModal}
                    onHide={() => setShowDraftModal(false)}
                    onCreateDraft={(value) => createNewDraftWrapper(value)}
                    name={user.name} />
            }
            {renderedComponents}
            {/* Render edit button conditionally */}
            {user !== null &&
                <Container>
                    <Row>
                        {/* Edit button. TODO: Render conditionally based on ownership of a page */}
                        <Col md={12} style={{ textAlign: 'right' }} className='edit-button'>
                            <Button onClick={handleEditButtonClickWrapper}>Edit Page</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </div >
    )
}

export default FacultyPage
