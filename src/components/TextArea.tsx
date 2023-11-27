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
                <Container>
                    <Row>
                        <Col>
                            <h1 className="label" dangerouslySetInnerHTML={{ __html: myProps.label}}></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="body-text" dangerouslySetInnerHTML={{ __html: myProps.content}}></h1>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}

export default TextArea
