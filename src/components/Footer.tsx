import { Container, Col, Row, Image } from 'react-bootstrap';
import logo from '../imgs/stackedLogo.png'
import footerImage from '../imgs/footer-stadium.webp'
import '../css/footer.css';


// This creates the footer component
function Footer() {
    return (
        <footer>
            <Container>
                <Row className='footer-row'>
                    <Col md={{ span: 4, offset: 0 }} sm={12} xs={12} >
                        {/* Adds yellow banner, logo and social icons */}
                        <div className='banner'>
                            <Image src={logo} className='logo' alt='Merrimack College Logo' />
                            <div className="socials">
                                <a href="https://www.facebook.com/merrimackcollege/" target="_blank" > <i className="bi bi-facebook icon" aria-label='Facebook Icon'></i> </a>
                                <a href="https://www.instagram.com/merrimackcollege/" target="_blank" >  <i className="bi bi-instagram icon" aria-label='Instagram Icon'></i></a>
                                <a href="https://www.tiktok.com/@merrimackcollege" target="_blank" >   <i className="bi bi-tiktok icon" aria-label='TikTok Icon'></i></a>
                                <a href="https://www.youtube.com/user/merrimackcollege" target="_blank" >  <i className="bi bi-youtube icon" aria-label='Youtube Icon'></i></a>
                                <a href="https://www.linkedin.com/school/merrimack-college/" target="_blank" >   <i className="bi bi-linkedin icon" aria-label='Linkedin Icon'></i></a>
                                <a href="https://twitter.com/merrimack" target="_blank" >  <i className="bi bi-twitter icon" aria-label='Twitter Icon'></i></a>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        {/* Adds image */}
                        <div className='image-container'>
                            <img src={footerImage} className='footer-image'/>
                        </div>
                    </Col>
                    <Col md={4} xs={12} className='text-container' >
                        {/* Adds information text */}
                        <div className='footer-text '>
                            <Row>
                                <h2>Merrimack College</h2>
                            </Row>
                            <Row>
                                <h5>315 Turnpike Street</h5>
                            </Row>
                            <Row>
                                <h5>North Andover, MA 01845</h5>
                            </Row>
                            <Row>
                                <h5>(978) 837-5000</h5>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
