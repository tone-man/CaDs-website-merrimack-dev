import { Col, Container, Row } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import '../css/contributer.css'

function ProjectContributer() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={12} xs={12} className='contributor-container'>
                        <Row>
                            <Col md={2} xs={12}>
                                <ProfileImage size='70px' />
                                <h1 className='featured-text' style={{ color: 'black' }}> Faculty Name</h1>
                            </Col>
                            <Col md={10} xs={12}>
                                <h1 className='contributor-info'>
                                    For the past 20 years, Dr. St. Hilaire has been engaged in basic human research with a focus on
                                    combining computational and experimental approaches to understand the impact of insufficient sleep and circadian rhythm disruption on human health and performance.
                                    She is an accomplished early-stage investigator who recently served as PI on an NIH-funded R21 as well as a NASA-funded Omnibus award, and currently serves as PI on NIH-funded
                                    R01 and R03 awards.
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
