import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/projectCard.css'
import { Card, Col, Figure, Row } from 'react-bootstrap';
import AccordionContributer from './AccordionContributer';
import FacultyCarousel, { facultyMembers } from './FacultyCarousel';
import pic from '../imgs/footer-stadium.webp';


//This function creates the actual project card content, including styling and positioning
//TODO:  Add image after images are able to be fetched successfully from database
function projectCardContent(
    title: string,
    faculty: facultyMembers[],
    imageAlt: string,
    imageDescription: string,
    description: string,
    link: string,
    parity: number) {

    return (
        <>
            {/*This positions & styles the Title & Faculty Member Carousel  */}
            <Row style={{ marginBottom: '20px' }} className="d-flex justify-content-center align-items-center">
                <Col>
                    <h1 className='title-text'> {title} </h1>
                </Col>
                <Col md={{ span: 3, offset: 3 }} xs={{ span: 4, offset: 0 }}>
                    <FacultyCarousel faculty={faculty} />
                </Col>
            </Row>

            <Row>
                {/*This positions & styles the image, image Alt, and image description featured on the component  */}
                <Col className="d-flex justify-content-center align-items-center" md={{ span: 3, offset: 1 }} xs={{ span: 12, offset: 0 }}>
                    <Figure >
                        <Figure.Image
                            alt={imageAlt}
                            src={pic}
                            className='rounded overflow-hidden project-images'
                        />
                        <Figure.Caption style={{ textAlign: 'center' }}>
                            <i> {imageDescription}</i>
                        </Figure.Caption>
                    </Figure>
                </Col>

                {/*This positions & styles the description div for the event and the link */}
                <Col md={{ span: 8, offset: 0 }} sm={12} xs={12}>
                    <section >
                        <div className='no-scrollbar description-div'>
                            <h2 className='description-text'>
                                {description}
                            </h2>
                        </div>
                        <a href={link}>
                            <h1 className='featured-text'> Read More</h1>
                        </a>
                    </section>
                </Col>
            </Row>

            {/* Calls the contributers component on the project. Param determines styling */}
            <Row>
                <AccordionContributer number={parity} />
            </Row>
        </>
    )
}


//Interface for the the project component props on the home page. 
//TODO: Add image to interface after images are able to be fetched successfully from database
export interface myProjectProps {
    title: string,
    description: string,
    projectLink: string,
    imageDescription: string,
    imageAlt: string,
    number: number,
    faculty: facultyMembers[]
}

// This component actually creates the alternating project components seen on the home page
function ProjectCard(myProps: myProjectProps) {

    const number = myProps.number + 1;
    const parity = number % 2;

    return (
        <div>
            {/* This if statement determines if the component will be formatted to the left or the right side of the screen */}
            {(parity === 1) ?

                // Project Card for Left Side
                <Row className='project-row '>
                    <Col md={10} xs={12}>
                        <Card className='project-card project-card-left'>
                            {
                                projectCardContent(
                                    myProps.title,
                                    myProps.faculty,
                                    myProps.imageAlt,
                                    myProps.imageDescription,
                                    myProps.description,
                                    myProps.projectLink,
                                    1)
                            }
                        </Card>
                    </Col>
                </Row>
                :
                //Project Card for Right Side
                <Row className='project-row'>
                    <div>
                        <Col md={{ span: 10, offset: 2 }} xs={12}>
                            <Card className='project-card project-card-right'>
                                {
                                    projectCardContent(
                                        myProps.title,
                                        myProps.faculty,
                                        myProps.imageAlt,
                                        myProps.imageDescription,
                                        myProps.description,
                                        myProps.projectLink,
                                        2)
                                }
                            </Card>
                        </Col>
                    </div>
                </Row>
            }
        </div>
    )
}

export default ProjectCard