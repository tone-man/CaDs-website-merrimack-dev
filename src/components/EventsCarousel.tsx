import { Carousel, Col } from 'react-bootstrap';

import Events, { myEventProps } from './Events';
import Header from './Header';

import '../css/eventsCarousel.css'


const eventsArray: myEventProps[] = [];

const eventValues = [['/src/imgs/projectpic.webp', 'Caption 1', 'Brief Description', 'Longer Description', 'LINK!'],
['/src/imgs/projectpic.webp', 'Caption 2', 'Brief Description', 'Longer Description', 'LINK!'],
['/src/imgs/projectpic.webp', 'Caption 3', 'Brief Description', 'Longer Description', 'LINK!']]

function makeEventObject(
    imgSource: string,
    caption: string,
    briefDescription: string,
    longerDescription: string,
    link: string): myEventProps {
    return {
        imgSource: imgSource,
        caption: caption,
        briefDescription: briefDescription,
        longerDescription: longerDescription,
        link: link
    };
}

function makeCarousel(eventsArray: myEventProps[], eventValues: string[][]) {
    for (let i = 0; i < eventValues.length; i++) {
        eventsArray.push(makeEventObject(eventValues[i][0], eventValues[i][1], eventValues[i][2], eventValues[i][3], eventValues[i][4]));
    }
}

makeCarousel(eventsArray, eventValues);

function EventsCarousel() {
    return (
        <div>
            <Header img= {'/src/imgs/OBCenter.jpg'}/>
            <div className='carousel-container'>
                <Col md={8} xs={12}>
                    <div className='custom-carousel'>
                        <Carousel>
                            {
                                eventsArray.map(events =>
                                    <Carousel.Item  >
                                        <div className='nested-container'>
                                            <Events
                                                imgSource={events.imgSource}
                                                link={events.link}
                                                longerDescription={events.longerDescription}
                                                briefDescription={events.briefDescription}
                                                caption={events.caption} />
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
