
import { Container, Col, Row, Button } from 'react-bootstrap'
import { useEffect } from 'react';
import '../../css/dashboardCSS/pageSection.css'
import ConfirmDraftModal from '../Modals/ConfirmDraftModal';
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase } from 'firebase/database';
import FireBaseApp from '../../firebase';
import { createNewDraft, handleEditButtonClick } from '../../utils/createNewDraft';
import useToastContext from '../toasts/useToastContext';


export interface pageProps {
    name: string,
    pageLink: string
}

// Interface for myPageProps. Should be an array of pages 
interface myPageProps {
    pages: pageProps[],
}

// Returns the page section of the dashboard
function PageSection(myProps: myPageProps) {


    const db = getDatabase(FireBaseApp);
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const addToast = useToastContext();

    const [showDraftModal, setShowDraftModal] = useState(false);
    const [selectedPage, setSelectedPage] = useState(null);
    const [makeNewDraft, setMakeNewDraft] = useState<null | boolean>(null)

    // Use effect that checks if a page has been selected to "edit", and then calls the logic for creating a new
    //draft or continuing to edit more
    useEffect(() => {
        if (selectedPage && user) {
            handleEditButtonClick(
                db,
                selectedPage.components,
                setShowDraftModal,
                navigate,
                `drafts/${user['id']}/${selectedPage.key}/components`,
                addToast
            );
            setMakeNewDraft(null)
        }

    }, [addToast, db, makeNewDraft, navigate, selectedPage, user]);

    // Sets the page being edited to the current page that was clicked
    const handleEditButtonClickWrapper = (page: pageProps) => {
        setSelectedPage(page);
    };

    // Function which either creates new draft or continues editing old one
    const createNewDraftWrapper = (makeNewDraft: boolean) => {
        if (selectedPage && user){
            createNewDraft(
                makeNewDraft,
                db,
                selectedPage.components,
                navigate,
                `drafts/${user['id']}/${selectedPage.key}/components`,
                addToast
            )
        }
    };

    return (
        <div>
            <Container >
                {/* Title */}
                <div className='dashboard-page-section'>
                    <Row style={{ paddingBottom: '20px' }}>
                        <Col className='title mx-auto'>
                            <h1>YOUR PAGES</h1>
                        </Col >
                    </Row>

                    {/* Actual pages */}
                    <div className='page-container'>
                        {/* If there are pages in the page array, then iterate through and map each element to a new page section */}
                        {myProps.pages.length !== 0 ? (
                            myProps.pages.map((page, index) => (
                                <div style={{ borderTop: '1px black solid' }} key={index}>
                                    <Row className='rows'>
                                        <Col md={11} xs={9} className='page-name'>
                                            <h3 className='smallFont'>
                                                {page.name}
                                            </h3>
                                        </Col>
                                        <Col md={1} xs={3} className='new-page-button'>
                                            <a>
                                                <Button className='link-button' onClick={() => handleEditButtonClickWrapper(page)}>
                                                    <i className="bi bi-arrow-right"></i>
                                                </Button>
                                            </a>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        )
                            : (
                                // If there are no pages then display empty message
                                <div className='empty mx-auto' style={{ borderTop: '1px black solid' }}>
                                    <h4> <i>No pages are available </i></h4>
                                </div>
                            )}
                    </div>

                </div>
            </Container >

            {showDraftModal && user !== null &&
                <ConfirmDraftModal show={showDraftModal}
                    onHide={() => setShowDraftModal(false)}
                    onCreateDraft={(value) => createNewDraftWrapper(value)}
                    name={user['name']} />
            }
        </div >
    )
}

export default PageSection;
