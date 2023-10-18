
import { Col, Row, Container, Image } from 'react-bootstrap'
import merrimackLogo from '../imgs/logo.webp';

function ProjectContributer() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={12} xs={12} style={{ background: 'white', borderRadius: '20px', padding: '20px' }}>
                        <Row>
                        <Col md={2} xs={12}>
                            <div className='mx-auto' style={{ width: '60px', height: '60px' }}>
                                <Image
                                    className="rounded-circle overflow-hidden profileImage border"
                                    src={merrimackLogo}
                                    alt="Profile Picture"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <h1 className='profile-text' style={{ color: 'black' }}> Faculty Name</h1>
                        </Col>
                        <Col md={10} xs={12}>
                            <h1 style={{ color: 'black', fontSize: '1rem', padding: '20px'  }}> For the past 20 years, Dr. St. Hilaire has been engaged in basic human research with a focus on combining computational and experimental approaches to understand the impact of insufficient sleep and circadian rhythm disruption on human health and performance. She is an accomplished early-stage investigator who recently served as PI on an NIH-funded R21 as well as a NASA-funded Omnibus award, and currently serves as PI on NIH-funded R01 and R03 awards.</h1>
                        </Col>
                        </Row>
                    </Col>
                    
                </Row>

            </Container>
        </div>
    )
}

export default ProjectContributer
