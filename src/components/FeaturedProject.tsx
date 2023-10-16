import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Card, Carousel, Col, Container, Row, Image } from 'react-bootstrap';

import '../css/FeaturedProject.css'

import merrimackLogo from '../imgs/logo.webp';

function FeaturedProject() {
    return (
        <>
            <Container fluid className='projects-container container-fluid'>
                <Row className='project-row ' style={{ border: '5px purple solid' }}>
                    <Col md={6} xs={11} style={{ border: '5px black solid' }}>
                        <Card className='project-card-left' style={{ border: '5px red solid' }}>
                            <Row>
                                <Col md={{ span: 6, offset: 0 }} xs={{ span: 6, offset: 0 }}>
                                    <h1 className='title-text'> CaDS Department Web Site</h1>
                                </Col>
                                <Col md={{ span: 3, offset: 3 }} xs={{ span: 6, offset: 0 }}>
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
                        </Card>
                    </Col>
                </Row>
                <Row className='project-row'>
                    <div>
                        <Col md={{ span: 6, offset: 6 }} xs={{ span: 11, offset: 1 }}>
                            <Card className='project-card-right'>
                            <Row>
                             
                                <Col md={{ span: 2, offset: 0 }} xs={{ span: 4, offset: 0 }}>
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
                                   <Col md={{ span: 6, offset: 4 }} xs={{ span: 6, offset: 0 }}>
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
