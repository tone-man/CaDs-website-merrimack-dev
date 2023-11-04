import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Accordion, Col, Row } from 'react-bootstrap';
import FormModal from './FormModal';
import ProjectContributer, { contributerProps } from './ProjectContributer';
import '../css/contributer.css';

interface accordionProps {
    number: number
    contributers: contributerProps[];
}

// Creates an accordion component who, in the future, will have contributer components
function AccordionContributer(myProps: accordionProps) {
    const accordion_color = myProps.number === 1 ? 'rgb(20, 54, 100)' : 'rgb(42, 42, 43)';
    return (
        <Col md={{ span: 12, offset: 0 }} xs={{ span: 12, offset: 0 }} style={{ color: 'white' }}>
            <Accordion flush defaultActiveKey="0">
                <Accordion.Item eventKey="1" style={{ background: accordion_color, margin: 'auto', justifyContent: 'center' }}>
                    <Accordion.Header style={{ color: 'white', cursor: 'pointer' }} />
                    <Accordion.Body style={{ color: 'white', borderRadius: '40px' }}>
                        <Row>
                            <Col style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <h1 style={{ paddingBottom: '40px' }} className='mediumFont caslonBold'>Contributers</h1>
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                <FormModal />
                            </Col>
                        </Row>
                        {
                            // Maps each contributer in the array to a project contributer item
                            myProps.contributers.map((contributer, index) => (
                                <ProjectContributer key={index}
                                    name={contributer.name} description={contributer.description} />
                            ))
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    )
}

export default AccordionContributer
