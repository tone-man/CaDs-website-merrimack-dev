import { Col, Container, Row } from 'react-bootstrap'
import '../css/facultyMemberPage.css'

export interface textProps {
    label: string,
    content: string,
}

function TextArea(myProps: textProps) {
    return (
        <div>
            <Container className="faculty-body-container">
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label"><span> {myProps.label}</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="body-text"> {myProps.content}</h1>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}

export default TextArea
