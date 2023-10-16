import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Card, Carousel, Col, Container, Row, Image, Nav } from 'react-bootstrap';

import '../css/FeaturedProject.css'

import merrimackLogo from '../imgs/logo.webp';

function FeaturedProject() {
    return (
        <>
            <Container fluid className='projects-container container-fluid'>
                <Row className='project-row '>
                    <Col md={6} xs={11}>
                        <Card className='project-card-left'>
                            <Nav.Link href="#">
                                <Col md={{ span: 2, offset: 10 }} xs={{ span: 4, offset: 8 }}>
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
                                        </Carousel.Item>

                                    </Carousel>
                                </Col>
                            </Nav.Link>
                        </Card>
                    </Col>
                </Row>
                <Row className='project-row'>
                    <div>
                        <Col md={{ span: 6, offset: 6 }} xs={{ span: 11, offset: 1 }}>
                            <Card className='project-card-right'>
                                <Col md={{ span: 2, offset: 0 }} xs={{ span: 4, offset: 0 }}>
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
                                        </Carousel.Item>

                                    </Carousel>
                                </Col>
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
            </Container>
        </>
    )
}

export default FeaturedProject
