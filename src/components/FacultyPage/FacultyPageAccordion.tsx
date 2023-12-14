import { Container, Accordion } from 'react-bootstrap'

export interface facultyPageAccordionInterface {
    label: string,
    content: string
}

// Drop down component
function FacultyPageAccordion(myProps: facultyPageAccordionInterface) {
    return (
        <div>
            <Container className="faculty-body-container">
                <Container >
                    <Accordion className="accordion-container">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="accordion-header" dangerouslySetInnerHTML={{ __html: myProps.label}}></h4></Accordion.Header>
                            <Accordion.Body>
                            <h4 dangerouslySetInnerHTML={{ __html: myProps.content}}></h4>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </Container>
        </div>
    )
}

export default FacultyPageAccordion
