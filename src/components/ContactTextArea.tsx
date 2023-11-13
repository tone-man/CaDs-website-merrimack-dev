
import { Container, Row, Col } from 'react-bootstrap'

interface contactProps {
    phoneNumber: string,
    email: string,
    building: string
}

function ContactTextArea(myProps: contactProps) {
  return (
    <div>
      <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label">Contact Information</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <Col md={1} sm={1} xs={2}>
                            <i className="bi bi-telephone-fill icon"></i>
                        </Col>
                        <Col md={11} sm={11} xs={10}>
                            <h1 className="contact-text"  > {myProps.phoneNumber}</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <Col md={1} sm={1} xs={2}>
                            <i className="bi bi-envelope-fill icon"></i>
                        </Col>
                        <Col md={11} sm={11} xs={10}>
                            <h1 className="contact-text" > {myProps.email}</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <Col md={1} sm={1} xs={2}>
                            <i className="bi bi-building-fill icon"></i>
                        </Col>
                        <Col md={11} sm={11} xs={10}>
                            <h1 className="contact-text"> {myProps.building}</h1>
                        </Col>
                    </Row>
                </Container>
                {/* <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label">Publications</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <a href="/">
                            <h1 className="publications-text">  Publication 1</h1>
                        </a>
                    </Row>
                    <Row className="container">
                        <a href="/">
                            <h1 className="publications-text">  Publication 1</h1>
                        </a>
                    </Row>
                    <Row className="container">
                        <a href="/">
                            <h1 className="publications-text">  Publication 1</h1>
                        </a>
                    </Row>
                </Container>  */}
    </div>
  )
}

export default ContactTextArea
