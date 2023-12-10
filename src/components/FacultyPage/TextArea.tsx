import { Col, Container, Row } from 'react-bootstrap'
import '../../css/facultyPageCSS/facultyPage.css'

export interface textProps {
    label: string,
    content: string,
}

// Text area component 
function TextArea(myProps: textProps) {
    return (
        <div>
            <Container className="faculty-body-container">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="label" dangerouslySetInnerHTML={{ __html: `<span>${myProps.label}</span>` }}></h1>
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
