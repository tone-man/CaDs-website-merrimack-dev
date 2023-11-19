
import { Container, Row, Col } from 'react-bootstrap'
import '../../css/facultyMemberPage.css'

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
                    <Row>
                        <Col md={4} sm={3} xs={3} style={{textAlign: 'right'}}>
                            <i className="bi bi-telephone-fill icon"></i>
                        </Col>
                        <Col md={6} sm={9} xs={8} style={{  textAlign: 'left' }} >
                            <h1 className="contact-text"> {myProps.email}</h1>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={4} sm={3} xs={3} style={{textAlign: 'right'}}>
                            <i className="bi bi-envelope-fill icon"></i>
                        </Col>
                        <Col md={6} sm={9} xs={8} style={{  textAlign: 'left' }} >
                            <h1 className="contact-text" > {myProps.email}</h1>
                        </Col>
                    </Row>
                    <Row >
                    <Col md={4} sm={3} xs={3} style={{textAlign: 'right'}}>
                            <i className="bi bi-building-fill icon"></i>
                        </Col>
                        <Col md={6} sm={9} xs={8} style={{  textAlign: 'left' }} >
                            <h1 className="contact-text"> {myProps.location}</h1>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </div>
    )
}

export default ContactTextArea
