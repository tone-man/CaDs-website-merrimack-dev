import '../../css/homepageCSS/contributer.css';

import { Accordion, Col, Row } from 'react-bootstrap';
import FormModal from '../Modals/FormModal';
import ProjectContributer, { contributerProps } from './ProjectContributer';

interface accordionProps {
    number: number
    contributers: contributerProps[];
    projectTitle: string
}

// Creates an accordion component that contains contributer
function AccordionContributer(myProps: accordionProps) {
    // Color of accordion based on which side it is on
    const accordion_color = myProps.number === 1 ? 'rgb(20, 54, 100)' : 'rgb(42, 42, 43)';
    return (
        <Col md={12} sm={12}xs={12} style={{ color: 'white'}}>
            <Accordion flush defaultActiveKey="0">
                <Accordion.Item eventKey="1" style={{ background: accordion_color, margin: 'auto', justifyContent: 'center' }}>
                    <Accordion.Header style={{ color: 'white', cursor: 'pointer' }} />
                    <Accordion.Body style={{ color: 'white', borderRadius: '40px' }}>
                        <Row>
                            <Col md={11} sm={10} xs={10} style={{textAlign: 'left'}} >
                                <h1 style={{ paddingBottom: '40px' }} className='caslonBold contributer-title'>Contributers</h1>
                            </Col>
                            <Col md={1} sm={2} xs={2} style={{textAlign: 'right'}} >
                                <FormModal title={myProps.projectTitle}/>
                            </Col>
                        </Row>
                        {
                            // Maps each contributer in the array to a project contributer component
                            myProps.contributers.map((contributer, index) => (
                                <ProjectContributer key={index}
                                    image ={contributer.image}
                                    name={contributer.name} 
                                    description={contributer.description}
                                    nestedOrder={index} />
                            ))
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    )
}

export default AccordionContributer
