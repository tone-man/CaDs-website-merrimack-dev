import { Col, Container, Row } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import '../css/contributer.css'

export interface contributerProps {
    name: string,
    description: string,
    nestedOrder: number,
}

function ProjectContributer(myProps: contributerProps) {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={12} xs={12} className='contributor-container'>
                        <Row>
                            <Col md={3} sm={12} xs={12}>
                                <ProfileImage size='70px' position='mx-auto' />
                                <h1 className='featured-text' style={{ color: 'black' }}> {myProps.name}</h1>
                            </Col>
                            <Col md={9} sm={12} xs={12}>
                                <h1 className='contributor-info'>
                                    {myProps.description}
                                </h1>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProjectContributer
