import { Container, Accordion } from 'react-bootstrap'

export interface facultyPageAccordionInterface {
    label: string,
    content: string
}

function FacultyPageAccordion(myProps: facultyPageAccordionInterface) {
    return (
        <div>
            <Container className="faculty-body-container">
                <Container >
                    <Accordion className="accordion-container">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="accordion-header">{myProps.label} </h4></Accordion.Header>
                            <Accordion.Body>
                                {myProps.content}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </Container>
        </div>
    )
}

export default FacultyPageAccordion
