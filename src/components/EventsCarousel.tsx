import { Carousel, Col } from 'react-bootstrap';

import Events, { myEventProps } from './Events';
import Header from './Header';

import '../css/eventsCarousel.css'

const eventsArray: myEventProps[] = [];

const eventValues = [
    ['src/imgs/projectpic.webp', 'imageAlt', 'Caption 1', 'The Careers of the Common Good Internship & Career Fair is open to current Merrimack students and Merrimack alumni. Within this fair, you will find employers from various industries (typically government, human services, non-profit, education, healthcare, etc.)' +
        'that are hiring for both internships and full-time positionsFree', 'LINK!', 'Careers for the Common Good Internship & Career Fair', 'Thursday, October 26', 'Arcidi A 315 Turnpike Street, North Andover, United States'],
    ['/src/imgs/projectpic.webp', 'imageAlt', 'Caption 2', 'The Careers of the Common Good Internship & Career Fair is open to current Merrimack students and Merrimack alumni. Within this fair, you will find employers from various industries (typically government, human services, non-profit, education, healthcare, etc.)' +
        'that are hiring for both internships and full-time positionsFree', 'LINK!', 'Careers for the Common Good Internship & Career Fair', 'Thursday, October 26', 'Arcidi A 315 Turnpike Street, North Andover, United States'],
    ['/src/imgs/projectpic.webp', 'imageAlt', 'Caption 3', 'The Careers of the Common Good Internship & Career Fair is open to current Merrimack students and Merrimack alumni. Within this fair, you will find employers from various industries (typically government, human services, non-profit, education, healthcare, etc.)' +
        'that are hiring for both internships and full-time positionsFree', 'LINK!', 'Careers for the Common Good Internship & Career Fair', 'Thursday, October 26', 'Arcidi A 315 Turnpike Street, North Andover, United States']];

function makeEventObject(
    imgSource: string,
    imageAlt: string,
    caption: string,
    description: string,
    link: string,
    title: string,
    date: string,
    location: string): myEventProps {
    return {
        imgSource: imgSource,
        imageAlt: imageAlt,
        caption: caption,
        description: description,
        link: link,
        title: title,
        date: date,
        location: location
    };
}

function makeCarousel(eventsArray: myEventProps[], eventValues: string[][]) {
    for (let i = 0; i < eventValues.length; i++) {
        eventsArray.push(makeEventObject(eventValues[i][0], eventValues[i][1], eventValues[i][2], eventValues[i][3], eventValues[i][4], eventValues[i][5], eventValues[i][6], eventValues[i][7]));
    }
}

makeCarousel(eventsArray, eventValues);

function EventsCarousel() {
    return (
        <div>
            <Header img={'src/imgs/OBCenter.jpg'} />
            <div className='carousel-container'>
                <Col md={9} xs={12}>
                    <div className='custom-carousel'>
                        <Carousel>
                            {
                                eventsArray.map(events =>
                                    <Carousel.Item interval={20000} >
                                        <div className='nested-container'>
                                            <Events
                                                imgSource={events.imgSource}
                                                imageAlt={events.imageAlt}
                                                link={events.link}
                                                description={events.description}
                                                caption={events.caption}
                                                title={events.title}
                                                date={events.date}
                                                location={events.location} />
                                        </div>
                                    </Carousel.Item>
                                )
                            }
                        </Carousel>
                    </div>
                </Col>
            </div>
        </div>
    )
}

export default EventsCarousel
