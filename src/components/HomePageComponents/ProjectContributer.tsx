import '../../css/homepageCSS/contributer.css'

import { Col, Row } from 'react-bootstrap'
import ProfileImage from '../ProfileImage';

export interface contributerProps {
    name: string,
    description: string,
    image: string,
    nestedOrder: number,
}

// Component which contains all respective information about a contributer to a project and handles styling
function ProjectContributer(myProps: contributerProps) {
    return (
        <div>
            <Row>
                <Col md={12} xs={12} className='contributor-container'>
                    <Row>
                        <Col md={3} sm={12} xs={12}>
                            <ProfileImage size='70px' position='mx-auto' image={myProps.image} />
                            <h1 className='featured-text' style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: myProps.name }}></h1>
                        </Col>
                        <Col md={9} sm={12} xs={12}>
                            <h1 className='contributor-info' dangerouslySetInnerHTML={{ __html: myProps.description }}></h1>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default ProjectContributer
