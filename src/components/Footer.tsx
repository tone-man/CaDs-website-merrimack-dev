import React from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import logo from '../imgs/stackedLogo.png'
import footerImage from '../imgs/footer-stadium.webp'

import '../css/footer.css';

function Footer() {
    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        <Col xs={12} md={3}>
                            <div className="banner">
                                <img className='logo' src={logo} />
                                <div className="socials">
                                    <a href="https://www.facebook.com/merrimackcollege/" target="_blank" > <i className="bi bi-facebook icon"></i> </a>
                                    <a href="https://www.instagram.com/merrimackcollege/" target="_blank" >  <i className="bi bi-instagram icon"></i></a>
                                    <a href="https://www.tiktok.com/@merrimackcollege" target="_blank" >   <i className="bi bi-tiktok icon"></i></a>
                                    <a href="https://www.youtube.com/user/merrimackcollege" target="_blank" >  <i className="bi bi-youtube icon"></i></a>
                                    <a href="https://www.linkedin.com/school/merrimack-college/" target="_blank" >   <i className="bi bi-linkedin icon"></i></a>
                                    <a href="https://twitter.com/merrimack" target="_blank" >  <i className="bi bi-twitter icon"></i></a>
                                </div>
                            </div>
                        </Col>

                        <Col className="ml-9" xs = {8} md = {3}>
                            <img className='footerImage' src={footerImage} />
                        </Col>
                        <Col xs = {6} md = {3} style={{ textAlign: 'center'}}>
                            <Row>
                                <h1 style={{ color: 'white', fontSize: '2rem', marginTop: '50px' }}>Merrimack College</h1>
                            </Row>
                            <Row>
                                <h1 className='footerText'>315 Turnpike Street</h1>
                            </Row>
                            <Row>
                                <h1 className='footerText'>North Andover, MA 01845</h1>
                            </Row>
                            <Row>
                                <h1 className='footerText'>(978) 837-5000</h1>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}

export default Footer
