import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Card, Carousel, Col, Figure, Row, Image } from 'react-bootstrap';

import '../css/FeaturedProject.css'

import merrimackLogo from '../imgs/logo.webp';
import pic from '../imgs/footer-stadium.webp';

export interface facultyMems {
    facultyName: string,
    facultyImg: string
}

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
    
    const facultyMembersNum = myProps.faculty.length;
    const facultyMembers = myProps.faculty;

    return (
        <div>
            {(parity === 1) ?
                <Row className='project-row '>
                    <Col md={10} xs={12}>
                        <Card className='project-card-left'>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col md={{ span: 6, offset: 0 }} xs={{ span: 8, offset: 0 }} style={{ margin: 'auto' }}>
                                    <h1 className='title-text'> {myProps.title} </h1>
                                </Col>
                                <Col md={{ span: 3, offset: 3 }} xs={{ span: 4, offset: 0 }}>
                                    {facultyMembersNum > 1 ? (
                                        <Carousel variant='link'>
                                            {
                                                facultyMembers.map(members =>
                                                    <Carousel.Item>
                                                        <div className='mx-auto' style={{ width: '60px', height: '60px' }}>
                                                            <Image
                                                                className="rounded-circle overflow-hidden profileImage"
                                                                src={merrimackLogo}
                                                                alt="Profile Picture"
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                        <h1 className='profile-text'> {members.facultyName}</h1>
                                                    </Carousel.Item>
                                                )
                                            }
                                        </Carousel>
                                    ) : (
                                        <>
                                            <div className='mx-auto' style={{ width: '60px', height: '60px' }}>
                                                <Image
                                                    className="rounded-circle overflow-hidden profileImage"
                                                    src={merrimackLogo}
                                                    alt="Profile Picture"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <h1 className='profile-text'> {facultyMembers[0].facultyName}</h1>
                                        </>
                                    )}

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
                                        <div className='example description-div'>
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
                        <Col md={{ span: 10, offset: 2 }} xs={12}>
                            <Card className='project-card-right'>
                                <Row style={{ marginBottom: '20px' }}>
                                    <Col md={{ span: 6, offset: 0 }} xs={{ span: 8, offset: 0 }} style={{ margin: 'auto' }}>
                                        <h1 className='title-text'> {myProps.title} </h1>
                                    </Col>
                                    <Col md={{ span: 3, offset: 3 }} xs={{ span: 4, offset: 0 }}>
                                        {facultyMembersNum > 1 ? (
                                            <Carousel variant='link'>
                                                {
                                                    facultyMembers.map(members =>
                                                        <Carousel.Item>
                                                            <div className='mx-auto' style={{ width: '60px', height: '60px' }}>
                                                                <Image
                                                                    className="rounded-circle overflow-hidden profileImage"
                                                                    src={merrimackLogo}
                                                                    alt="Profile Picture"
                                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                            <h1 className='profile-text'> {members.facultyName}</h1>
                                                        </Carousel.Item>
                                                    )
                                                }
                                            </Carousel>
                                        ) : (
                                            <>
                                            <div className='mx-auto' style={{ width: '60px', height: '60px' }}>
                                                <Image
                                                    className="rounded-circle overflow-hidden profileImage"
                                                    src={merrimackLogo}
                                                    alt="Profile Picture"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <h1 className='profile-text'> {facultyMembers[0].facultyName}</h1>
                                        </>
                                        )}
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
                                            <div className='example description-div'>
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
                    </div>
                </Row>

            }
        </div>
    )
}

export default ProjectCard
