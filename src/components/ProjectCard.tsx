import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/projectCard.css'
import { Card, Col, Figure, Row } from 'react-bootstrap';
import AccordionContributer from './AccordionContributer';
import FacultyCarousel, { facultyMems } from './FacultyCarousel';
import pic from '../imgs/footer-stadium.webp';


export interface myProjectProps {
    title: string,
    description: string,
    projectLink: string,
    imageDescription: string,
    imageAlt: string,
    number: number,
    faculty: facultyMems[]
}

function ProjectCard(myProps: myProjectProps) {

    const number = myProps.number + 1;
    const parity = number % 2;

    return (
        <div>
            {(parity === 1) ?
                <Row className='project-row '>
                    <Col md={10} xs={12}>
                        <Card className='project-card project-card-left'>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col className='flex-start'>
                                    <h1 className='title-text'> {myProps.title} </h1>
                                </Col>
                                <Col md={{ span: 3, offset: 3 }} xs={{ span: 4, offset: 0 }}>
                                    <FacultyCarousel faculty={myProps.faculty} />
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center align-items-center" >
                                <Col className="d-flex justify-content-center align-items-center" md={{ span: 3, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                                    <Figure >
                                        <Figure.Image
                                            alt={myProps.imageAlt}
                                            src={pic}
                                            className='rounded overflow-hidden project-images'
                                        />
                                        <Figure.Caption style={{ textAlign: 'center' }}>
                                            <i> {myProps.imageDescription}</i>
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                                <Col md={{ span: 8, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                                    <section >
                                        <div className='no-scrollbar description-div'>
                                            <h2 className='description-text'>
                                                {myProps.description}
                                            </h2>
                                        </div>
                                        <a href={myProps.projectLink}>
                                            <h1 className='profile-text'> Read More</h1>
                                        </a>
                                    </section>
                                </Col>
                            </Row>
                            <Row>
                                <AccordionContributer number={1} />
                            </Row>
                        </Card>
                    </Col>
                </Row>

                :

                <Row className='project-row'>
                    <div>
                        <Col md={{ span: 10, offset: 2 }} xs={12}>
                            <Card className='project-card project-card-right'>
                                <Row style={{ marginBottom: '20px' }}>
                                    <Col className='flex-end'>
                                        <h1 className='title-text'> {myProps.title} </h1>
                                    </Col>
                                    <Col md={{ span: 3, offset: 3 }} xs={{ span: 4, offset: 0 }}>
                                        <FacultyCarousel faculty={myProps.faculty} />
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={{ span: 3, offset: 1 }} xs={{ span: 12, offset: 0 }} >
                                        <Figure >
                                            <Figure.Image
                                                alt={myProps.imageAlt}
                                                src={pic}
                                                className='rounded overflow-hidden project-images'
                                            />
                                            <Figure.Caption style={{ textAlign: 'center' }}>
                                                <i> {myProps.imageDescription}</i>
                                            </Figure.Caption>
                                        </Figure>
                                    </Col>
                                    <Col md={{ span: 8, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                                        <section >
                                            <div className='no-scrollbar description-div'>
                                                <h2 className='description-text'>
                                                    {myProps.description}
                                                </h2>

                                            </div>
                                            <a href={myProps.projectLink}>
                                                <h1 className='profile-text'> Read More</h1>
                                            </a>
                                        </section>
                                    </Col>
                                </Row>
                                <Row>
                                    <AccordionContributer number={2} />
                                </Row>
                            </Card>
                        </Col>
                    </div>
                </Row>

            }
        </div>
    )
}

export default ProjectCard
