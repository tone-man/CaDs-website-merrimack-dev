
import { Container, Row, Col } from 'react-bootstrap'
import '../../css/facultyPageCSS/facultyPage.css'

interface contactProps {
    phoneNumber: string,
    email: string,
    location: string
}

function ContactTextArea(myProps: contactProps) {
    return (
        <div>
            <Container className="faculty-body-container">

                <Container className="contact-container">
                    <Row>
                        <Col md={12}>
                            <h1 style={{ textAlign: 'center', padding: '10px' }} className="label">Contact Information</h1>
                        </Col>
                    </Row>
                    <Container style={{ width: '100%', margin: 'auto' }}>
                        <Row style={{marginBottom: '10px'}}>
                        <Col md={3} sm={3} xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <i className="bi bi-telephone-fill icon" ></i>
                            </Col>
                            <Col md={9} sm={9} xs={9}>
                                <h1
                                    className="contact-text"
                                    dangerouslySetInnerHTML={{ __html: myProps.phoneNumber }}
                                ></h1>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: '10px'}}>
                            <Col md={3} sm={3} xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <i className="bi bi-envelope-fill icon"></i>
                            </Col>
                            <Col md={9} sm={9} xs={9}>
                                <h1 className="contact-text" dangerouslySetInnerHTML={{ __html: myProps.email }}></h1>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: '10px'}}>
                        <Col md={3} sm={3} xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <i className="bi bi-building-fill icon"></i>
                            </Col>
                            <Col md={9} sm={9} xs={9} >
                                <h1 className="contact-text" dangerouslySetInnerHTML={{ __html: myProps.location }}></h1>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Container>

        </div>
    )
}

export default ContactTextArea
