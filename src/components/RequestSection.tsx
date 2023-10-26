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

function RequestSection(myProps: myRequestProps) {
    return (
        <div style={{background: 'lightgrey'}}>
            <Container>
                <div className='dashboard-request-section'>
                    <Row style={{ paddingBottom: '20px' }}>
                        <Col className='title ms-auto'>
                            <h1> REQUESTS</h1>
                        </Col >

                    </Row>

                        <div className='request-container scroll'  style={myProps.requests.length ===0 ? { height:'auto'} : {height : '450px'}}  >
                            {myProps.requests.length !== 0 ? (
                                myProps.requests.map((requests, index) => (
                                    <div style={index !==0 ? {borderTop: '1px black solid'} : {}}>
                                        <Row className='rows ml-auto'>
                                            <Col md={2} sm={2} xs={4} className='profile-image' >
                                                <ProfileImage size='60px' position='ml-auto' />
                                            </Col>
                                            <Col md={9} sm={10} xs={8} className='title'>
                                                <h3>
                                                    {requests.requestName}
                                                </h3>
                                            </Col>
                                            <Col md={1} sm={4} xs={4} className='new-page-button'>
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

export default RequestSection;
