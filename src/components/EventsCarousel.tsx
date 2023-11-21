import { Carousel, Col } from 'react-bootstrap';
import Events, { myEventProps } from './Events';
import Header from './Header';
import '../css/eventsCarousel.css'

interface myEventListProps {
    eventsArray: myEventProps[];
}


// This component creates an events carousel component and populates it with events
function EventsCarousel(myProps: myEventListProps) {

    return (
        <div>
            <Header img={'src/imgs/OBCenter.jpg'} title='Upcoming Events' />
            <div className='carousel-container'>
                <Col md={9} xs={12}>
                    <div className='custom-carousel'>
                        <Carousel>
                            {
                                // Maps each of the events in the events array to a carousel item
                                myProps.eventsArray.map((events, index) => (
                                    <Carousel.Item key={index} interval={20000} >
                                        <div className='nested-container'>
                                            <Events
                                                type={events.type}
                                                key={events.databaseKey}
                                                imgSource={events.imgSource}
                                                imageAlt={events.imageAlt}
                                                link={events.link}
                                                description={events.description}
                                                caption={events.caption}
                                                title={events.title}
                                                date={events.date}
                                                location={events.location}
                                                databaseKey={events.databaseKey} />
                                        </div>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>
                </Col>
            </div>
        </div>
    )
}

export default EventsCarousel
