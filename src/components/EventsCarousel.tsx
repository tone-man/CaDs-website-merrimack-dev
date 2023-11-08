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
    const [snapshotTemp, setSnapshot] = useState<myEventProps | object>({});


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

    // Gets the events information from the database
    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, 'pages/homepage/components/1/eventsCarousel');
        // Stores a listener for the database in a useState variable
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });
    }, []);

    // Actually parses database information so it can be passed to other components
    useEffect(() => {
        const arr: myEventProps[] = [];
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        // Iterates through event objects
        for (const [, value] of Object.entries(snapshotTemp)) {
            const event = value;

            // Creates a new project object and adds it to an array
            const newObj = makeEventObject(event.imgSource, event.imageAlt, event.caption, event.description, event.link, event.title, event.date, event.location);
            arr.push(newObj);
        }
        // Sets the project array information to the array of project objects whose information we parsed
        setEventsArray(arr);
    }, [snapshotTemp]);


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
