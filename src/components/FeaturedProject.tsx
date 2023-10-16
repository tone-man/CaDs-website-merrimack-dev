import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Card, Col, Container, Row } from 'react-bootstrap';

import '../css/FeaturedProject.css'

function FeaturedProject() {
    return (
        <>
            <Container fluid className='projects-container container-fluid'>
                <Row className='project-row '>
                    <Col md={6} xs={11} className="">
                        <Card className='project-card-left'>
                        </Card>
                    </Col>
                </Row>
                <Row className='project-row'>
                    <div>
                        <Col md={{ span: 6, offset: 6 }} xs={{ span: 11, offset: 1}}>
                            <Card className='project-card-right'>
                                <h1 > hello</h1>
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
