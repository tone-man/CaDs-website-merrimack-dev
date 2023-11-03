import { Carousel, Col } from 'react-bootstrap';
import Events, { myEventProps } from './Events';
import Header from './Header';
import '../css/eventsCarousel.css'
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';



// This component creates an events carousel component and populates it with events
function EventsCarousel() {


    // Declares an array of event objects
    const [eventsArray, setEventsArray] = useState<myEventProps[]>([]);
    const [events, setEvents] = useState<myEventProps[]>([]);

    // Creates dummy data for each of the events objects in the carousel

    //Function that creates and returns an event object
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

    function getEvents() {
        const db = getDatabase();
        const projects = ref(db, 'pages/homepage/components');
        onValue(projects, (snapshot) => {
            setEvents(snapshot.val()[1].eventsCarousel)
        });
    }

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        const evs = [];
        for (let i = 0; i < events.length; i++) {
            const newObj = makeEventObject(events[i].imgSource, events[i].imageAlt, events[i].caption, events[i].description, events[i].link, events[i].title, events[i].date, events[i].location);
            evs.push(newObj);
        }
        setEventsArray(evs);
    }, [events]);


    return (
        <div>
            <Header img={'src/imgs/OBCenter.jpg'} title='Upcoming Events' />
            <div className='carousel-container'>
                <Col md={9} xs={12}>
                    <div className='custom-carousel'>
                        <Carousel>
                            {
                                // Maps each of the events in the events array to a carousel item
                                eventsArray.map((events, index) => (
                                    <Carousel.Item key={index} interval={20000} >
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
