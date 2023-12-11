import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row, Button } from 'react-bootstrap'
import '../css/pageSection.css'
import ConfirmDraftModal from './ConfirmDraftModal';
import { UserContext } from '../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase } from 'firebase/database';
import FireBaseApp from '../firebase';
import { createNewDraft, handleEditButtonClick } from '../utils/createNewDraft';
import useToastContext from './toasts/useToastContext';
import { useEffect } from 'react';

export interface pageProps {
    name: string,
    pageLink: string
}

// Interface for myPageProps. Should be an array of pages 
interface myPageProps {
    pages: pageProps[],
}

const db = getDatabase(FireBaseApp);
// Returns the page section of the dashboard
function PageSection(myProps: myPageProps) {
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [pageToEdit, setPageToEdit] = useState(null);
    
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const addToast = useToastContext();
    
    useEffect(() => {
        if (pageToEdit !== null){
           handleEditButtonClick(db, pageToEdit, createNewDraft(true, db, pageToEdit.components, navigate, `drafts/${user.id}/${pageToEdit.id}/components`, addToast), setShowDraftModal, navigate, `drafts/${user.id}/${pageToEdit.id}`, addToast);
        }
       }, [pageToEdit, user]);

    //  Wrapper function for handling the click event on the "Edit Page" button.
    const handleEditButtonClickWrapper = (page) => {
        setPageToEdit(page);
        
    };
    
    //  Wrapper function for handling the create new draft
    const createNewDraftWrapper = (makeNewDraft: boolean) => {

        createNewDraft(makeNewDraft, db, pageToEdit, navigate, `drafts/${user.id}/${page.id}/components`, addToast);
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
                    name={user.name} />
            }
        </div >
    )
}

export default PageSection;
