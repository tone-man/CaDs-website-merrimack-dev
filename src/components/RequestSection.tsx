import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row, Button } from 'react-bootstrap'
import '../css/requestSection.css'
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
                <div className='dashboard-request-section'>
                    <Row style={{ paddingBottom: '20px' }}>
                        <Col className='title ms-auto'>
                            <h1> REQUESTS</h1>
                        </Col >

                    </Row>

                        <div className='request-container scroll'  style={ myProps.requests.length ===0 ? { height:'auto'} : {height : '450px'} }  >
                            {myProps.requests.length !== 0 ? (
                                myProps.requests.map((requests) => (
                                    <div style={{border: '1px black solid' }}>
                                        <Row className='rows ml-auto'>
                                            <Col md={1} sm={3} xs={3} className='profile-image'>
                                                <ProfileImage size='75px' position='ml-auto' />
                                            </Col>
                                            <Col md={10} sm={6} xs={6} className='title'>
                                                <h3>
                                                    {requests.requestName}
                                                </h3>
                                            </Col>

                                            <Col md={1} sm={3} xs={3} className='new-page-button'>
                                                <a href={requests.requestLink}>
                                                    <Button className='link-button'><i className="bi bi-arrow-right"></i></Button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>

                                ))
                            ) : (
                                <div className='empty'>
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
