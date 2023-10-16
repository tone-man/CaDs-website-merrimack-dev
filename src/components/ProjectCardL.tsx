import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Card, Carousel, Col, Figure, Row, Image } from 'react-bootstrap';

import '../css/FeaturedProject.css'

import merrimackLogo from '../imgs/logo.webp';
import pic from '../imgs/footer-stadium.webp';


export interface myProjectProps {
    title: string,
    description: string,
    projectLink: string,
    imageDescription: string,
    imageAlt: string,
    number: number
}

function ProjectCardL(myProps: myProjectProps) {
    const number = myProps.number + 1;
    const parity = number % 2;
    return (
        <div>
            {(parity === 1) ?
                <Row className='project-row '>
                    <Col md={6} xs={11}>
                        <Card className='project-card-left'>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col md={{ span: 6, offset: 4 }} xs={{ span: 6, offset: 0 }} style={{ margin: 'auto' }}>
                                    <h1 className='title-text'> {myProps.title} </h1>
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
                                            alt={myProps.imageAlt}
                                            src={pic}
                                            className='rounded overflow-hidden project-images'
                                        />
                                        <Figure.Caption >
                                            <i> {myProps.imageDescription}</i>
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                                <Col md={{ span: 6, offset: 0 }} xs={{ span: 5, offset: 0 }}>
                                    <section>
                                        <div style={{ overflow: 'auto', maxHeight: '30vh' }} className='example'>
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
                        </Card>
                    </Col>
                </Row>
                :
                <Row className='project-row'>
                    <div>
                        <Col md={{ span: 6, offset: 6 }} xs={{ span: 11, offset: 1 }}>
                            <Card className='project-card-right'>
                                <Row>
                                    <Col md={{ span: 5, offset: 0 }} xs={{ span: 4, offset: 0 }}>
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
                                    <Col md={{ span: 6, offset: 0 }} xs={{ span: 6, offset: 1 }} style={{ margin: 'auto' }}>
                                        <h1 className='title-text'> {myProps.title}</h1>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={{ span: 5, offset: 0 }} xs={{ span: 6, offset: 1 }}>
                                        <section>
                                            <div style={{ overflow: 'auto', maxHeight: '30vh' }} className='example'>
                                                <h2 className='description-text'>
                                                    {myProps.description}
                                                </h2>
                                            </div>
                                            <a href={myProps.projectLink}>
                                                <h1 className='profile-text'> Read More</h1>
                                            </a>
                                        </section>
                                    </Col>
                                    <Col md={{ span: 6, offset: 0 }} xs={{ span: 5, offset: 0 }}>
                                        <Figure >
                                            <Figure.Image
                                                alt={myProps.imageAlt}
                                                src={merrimackLogo}
                                                className='rounded overflow-hidden project-images'
                                            />
                                            <Figure.Caption >
                                                <i> {myProps.imageDescription}</i>
                                            </Figure.Caption>
                                        </Figure>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </div>
                </Row>

            }
        </div>
    )
}

export default ProjectCardL
