import { Carousel, Col, Row } from 'react-bootstrap';

import '../css/eventsCarousel.css'

import pic from '../imgs/projectpic.webp'

import Events from './Events';

function EventsCarousel() {
    return (
        <div>
            <Row>
                <div className='carousel-container'>
                    <Col md={8} xs={12}>
                        <div className='custom-carousel'>
                            <h1 className='headerText'> Upcoming events</h1>
                            <Carousel>
                                <Carousel.Item  >
                                    <div className='nested-container'>
                                        <Events imgSource={pic} link='link' longerDescription='LongerDesc' briefDescription='brief' caption='caption' />
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </Col>
                </div>
            </Row>
        </div>
    )
}

export default EventsCarousel
