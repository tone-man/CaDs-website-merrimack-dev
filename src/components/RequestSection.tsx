import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row, Button } from 'react-bootstrap'
import '../css/sections.css'
import ProfileImage from './ProfileImage';

export interface requestProps {
    requestName: string,
    requestLink: string,
    requesterName?: string,
    requestImg?: string,

}

// Interface for the faculty carousel component. An array of faculty member objects should be passed in
interface myRequestProps {
    requests: requestProps[],
}

function PageSection(myProps: myRequestProps) {
    return (
        <div>
            <Container>
                <div className='sections-container'>
                    <Row style={{ paddingBottom: '20px' }}>
                        <Col className='title' md={6} xs={6}>
                            <h1> REQUESTS</h1>
                        </Col >
                        <Col className='new-page-button' md={6} xs={6}>
                            <Button className='button'> Create New Project</Button>
                        </Col>
                    </Row>


                    {myProps.requests.length !== 0 ? (

                        myProps.requests.map((requests) => (
                            <div className='scrollable'>
                            <div className='page-container'>
                            
                                    <div style={{ borderBottom: '1px black solid' }}>
                                        <Row className='rows ml-auto'>
                                            <Col md={1} sm={3} xs={3} className='profile-image'>
                                                <ProfileImage size='50px' position='ml-auto' />
                                            </Col>
                                            <Col md={8} sm={6} xs={6} className='title'>
                                                <h3>
                                                    {requests.requestName}
                                                </h3>
                                            </Col>

                                            <Col md={3} sm={3} xs={3} className='new-page-button'>
                                                <a href={requests.requestLink}>
                                                    <Button className='link-button'><i className="bi bi-arrow-right"></i></Button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='empty'>
                            <h4> <i>No pages are available </i></h4>
                        </div>
                    )}



                </div>
            </Container >

        </div >
    )
}

export default PageSection;
