import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row, Button } from 'react-bootstrap'
import '../css/pageSections.css'

export interface pageProps {
    pageName: string,
    pageLink: string
}

// Interface for myPageProps. Should be an array of pages 
interface myPageProps {
    pages: pageProps[],
}

// Returns the page section of the dashboard
function PageSection(myProps: myPageProps) {
    return (
        <div>
            <Container>
                {/* Title and Create New Project Button */}
                <div className='dashboard-page-section'>
                    <Row style={{ paddingBottom: '20px' }}>
                        <Col className='title' md={6} xs={6}>
                            <h1> YOUR PAGES</h1>
                        </Col >
                        <Col className='create-new-button' md={6} xs={6}>
                            <Button> Create New Project</Button>
                        </Col>
                    </Row>

                    {/* Actual pages */}
                    <div className='page-container'>
                        {/* If there are pages in the page array, then iterate through and map each element to a new page section */}
                        {myProps.pages.length !== 0 ? (
                            myProps.pages.map((page) => (
                                <div style={{borderTop: '1px black solid', borderBottom: '1px black solid'}}>
                                    <Row className='rows'>
                                        <Col md={11} xs={10} className='page-name'>
                                            <h3>
                                                {page.pageName}
                                            </h3>
                                        </Col>
                                        <Col md={1} xs={2} className='new-page-button'>
                                            <a href={page.pageLink}>
                                                <Button className='link-button'><i className="bi bi-arrow-right"></i></Button>
                                            </a>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        )
                            : (
                                // If there are no pages then display empty message
                                <div className='empty mx-auto'>
                                    <h4> <i>No pages are available </i></h4>
                                </div>
                            )}

                    </div>

                </div>
            </Container >

        </div >
    )
}

export default PageSection;
