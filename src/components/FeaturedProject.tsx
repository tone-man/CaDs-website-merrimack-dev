import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Card, Carousel, Col, Container, Figure, Row, Image } from 'react-bootstrap';

import '../css/FeaturedProject.css'

import merrimackLogo from '../imgs/logo.webp';
import pic from '../imgs/footer-stadium.webp';

function FeaturedProject() {
    return (
        <>
            <Container fluid className='projects-container'>
                <Row className='project-row '>
                    <Col md={6} xs={11}>
                        <Card className='project-card-left'>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col md={{ span: 6, offset: 4 }} xs={{ span: 6, offset: 0 }} style={{ margin: 'auto' }}>
                                    <h1 className='title-text'> CaDS Department Web Site</h1>
                                </Col>
                                <Col>
                                    <Carousel variant='link'>
                                        <Carousel.Item>
                                            <div className='mx-auto' style={{ width: '75px', height: '75px' }}>
                                                <Image
                                                    className="rounded-circle overflow-hidden"
                                                    src={merrimackLogo}
                                                    alt="Profile Picture"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />

                                            </div>
                                            <h1 className='profile-text'> Faculty Name</h1>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <div className='mx-auto' style={{ width: '75px', height: '75px' }}>
                                                <Image
                                                    className="rounded-circle overflow-hidden"
                                                    src={merrimackLogo}
                                                    alt="Profile Picture"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <h1 className='profile-text'> Faculty Name</h1>
                                        </Carousel.Item>
                                    </Carousel>
                                </Col>
                            </Row>
                            <Row >
                                <Col md={{ span: 5, offset: 1 }} xs={{ span: 6, offset: 1 }}>

                                    <Figure >
                                        <Figure.Image
                                            alt="Image Alt"
                                            src={pic}
                                            className='rounded overflow-hidden project-images'
                                        />
                                        <Figure.Caption >
                                            <i> Date of Image /Brief Description of event</i>
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                                <Col md={{ span: 6, offset: 0 }} xs={{ span: 5, offset: 0 }}>
                                    <section>
                                        <div style={{ overflow: 'auto', maxHeight: '30vh' }} className='example'>
                                            <h2 className='description-text'> The computer and data science department faculty do some really cool research, from
                                                graphics and gaming, to cryptography and security, to artificial intelligence and data mining. However,
                                                at present, we do not have a sleek, slick, nice looking website to show off these cool projects. That’s
                                                where you come in.
                                                I’d like you to build a extensible, easy-to-navigate, easy-to-expand, beautiful looking web site to link
                                                from the computer science department’s home page that showcases all the cool work the faculty do in
                                                the department. We will be coming up with a cool name for the research center as well.
                                                The School of Engineering and Computational Sciences is also in the process of creating a “Center
                                                for Computational Sciences” that will include Data Science, Math, and Physics as well. The web site
                                                might morph, through the semester, to be a project-based page for this new center, depending on how
                                                the planning and implementation of this new center go. But this is an opportunity to make a real lasting
                                                mark on the computer science department’s web presence.</h2>
                                        </div>
                                        <a href='#'>
                                            <h1 className='profile-text'> Read More</h1>
                                        </a>
                                    </section>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>



                <Row className='project-row'>
                    <div>
                        <Col md={{ span: 6, offset: 6 }} xs={{ span: 11, offset: 1 }}>
                            <Card className='project-card-right'>
                                <Row>

                                    <Col md={{ span: 3, offset: 3 }} xs={{ span: 4, offset: 0 }}>
                                        <div className='mx-auto' style={{ width: '75px', height: '75px' }}>
                                            <Image
                                                className="rounded-circle overflow-hidden"
                                                src={merrimackLogo}
                                                alt="Profile Picture"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h1 className='profile-text'> Faculty Name</h1>
                                    </Col>
                                    <Col md={{ span: 6, offset: 4 }} xs={{ span: 6, offset: 1 }}>
                                        <h1 className='title-text'> CaDS Department Web Site</h1>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </div>
                </Row>
                <Row className='project-row '>
                    <Col md={6} xs={11} className="">
                        <Card className='project-card-left'>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default FeaturedProject
