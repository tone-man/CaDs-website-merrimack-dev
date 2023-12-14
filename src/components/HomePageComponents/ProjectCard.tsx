import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../../css/homepageCSS/projectCard.css'
import '../../css/homepageCSS/imageModal.css'

import { Card, Col, Container, Figure, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import AccordionContributer from './AccordionContributer';
import FacultyCarousel, { facultyMembers } from './FacultyCarousel';
import { contributerProps } from './ProjectContributer';



//This function creates the actual project card content, including styling and positioning
function projectCardContent(
    title: string,
    facultyMembers: facultyMembers[],
    imageDescription: string,
    description: string,
    link: string | undefined,
    contributers: contributerProps[],
    modal: HTMLElement | null,
    modalImg: HTMLImageElement | null,
    captionText: HTMLElement | null,
    parity: number,
    image: string) {


    // Modal Reference: https://www.w3schools.com/howto/howto_css_modal_images.asp
    // Trigger modal when user clicks on image
    function triggerModal() {
        modal as HTMLElement;
        modalImg as HTMLElement;
        captionText as HTMLElement;
        if (modal && modalImg && captionText) {
            modal.style.display = "block";
            modalImg.src = image;
            captionText.innerHTML = imageDescription;
        }
    }

    // When the user clicks on <span> (x), close the modal
    function closeModal() {
        if (modal) {
            modal.style.display = "none";
        }
    }

    return (
        <>
            {/* <!-- The Modal for the image--> */}
            <div id="myModal" className="image-modal">
                <span className="image-close" onClick={closeModal}>&times;</span>
                <img className="image-modal-content" id="img" />
                <div id="caption"></div>
            </div>

            {/*This positions & styles the Title & Faculty Member Carousel  */}
            <Row style={{ marginBottom: '20px' }} className="d-flex justify-content-center align-items-center">
                <Col md={{ span: 9, offset: 0 }}>
                    <h1 className='title-text' dangerouslySetInnerHTML={{ __html: title }}></h1>
                </Col>
                <Col md={{ span: 3, offset: 0 }} sm={12} xs={12}>
                    <FacultyCarousel faculty={facultyMembers} />
                </Col>
            </Row>

            <Row className='d-flex align-items-center'>
                {/*This positions & styles the image, image Alt, and image description featured on the component  */}
                <Col className="d-flex justify-content-center align-items-center" md={{ span: 3, offset: 1 }} sm={12} xs={12}>
                    <Figure>
                        <Figure.Image
                            alt={`Project ${title} Image`}
                            src={image}
                            className='rounded overflow-hidden project-images'
                            onClick={() => triggerModal()}
                        />
                        <Figure.Caption style={{ textAlign: 'center' }}>
                            <h3 className='extraSmallFont' dangerouslySetInnerHTML={{ __html: imageDescription }}></h3>
                        </Figure.Caption>
                    </Figure>
                </Col>

                {/*This positions & styles the description div for the event and the link */}
                <Col md={8} sm={12} xs={12} className="align-items-center">
                    <section>
                        <div className='no-scrollbar description-div'>
                            <h2 className='description-text' dangerouslySetInnerHTML={{ __html: description }}></h2>
                        </div>
                        {link!=='<p><br></p>' && (
                            <a href={link} id="project-link">
                                <h1 className='featured-text' id="read-more"> Read More</h1>
                            </a>
                        )}
                    </section>
                </Col>
            </Row>

            {/* Calls the contributers component on the project. Param determines styling */}
            <Container fluid>
                <Row>
                    <AccordionContributer number={parity} contributers={contributers} projectTitle={title} />
                </Row>
            </Container>
        </>
    )
}


//Interface for the the project component props on the home page. 
export interface myProjectProps {
    type: string,
    title: string,
    description: string,
    projectLink: string | undefined,
    imageDescription: string,
    number: number,
    facultyMembers: facultyMembers[],
    contributers: contributerProps[],
    databaseKey: string,
    image: string
}

// This component actually creates the alternating project components seen on the home page
function ProjectCard(myProps: myProjectProps) {

    const number = myProps.number + 1;
    const parity = number % 2;

    // Get modal & other information for when user clicks on image
    const [modal, setModal] = useState<null | HTMLElement>(null);
    const [modalImg, setModalImg] = useState<null | HTMLImageElement>(null);
    const [captionText, setCaptionText] = useState<null | HTMLElement>(null);

    // Runs on initial render, gets all components for the modal to pass into the project cards
    useEffect(() => {
        setModal(document.getElementById("myModal") as HTMLElement);
        setModalImg(document.getElementById("img") as HTMLImageElement);
        setCaptionText(document.getElementById("caption") as HTMLElement);
    }, []);

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
                                    myProps.facultyMembers,
                                    myProps.imageDescription,
                                    myProps.description,
                                    myProps.projectLink,
                                    myProps.contributers,
                                    modal,
                                    modalImg,
                                    captionText,
                                    1,
                                    myProps.image)
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
                                        myProps.facultyMembers,
                                        myProps.imageDescription,
                                        myProps.description,
                                        myProps.projectLink,
                                        myProps.contributers,
                                        modal,
                                        modalImg,
                                        captionText,
                                        2,
                                        myProps.image)
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