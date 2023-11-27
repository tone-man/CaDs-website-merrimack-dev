
import { Card, Row, Col } from 'react-bootstrap';
import '../css/events.css';
import pic from '../imgs/footer-stadium.webp';

export interface myEventProps {
    type: string,
    imgSource: string,
    imageAlt: string,
    caption: string,
    description: string,
    link: string,
    title: string,
    date: string,
    location: string,
    databaseKey: string
}

// This creates the event component that will be in the events carousel
function Events(props: myEventProps) {
    return (
        <div>
            <Card className='event-card' style={{ background: 'rgb(20, 54, 100)', color: 'white' }}>
                <Card.Body>
                    <Row>
                        {/* Event Title */}
                        <Col md={12} xs={12}>
                            <Card.Title className='card-header'>
                                <h1 dangerouslySetInnerHTML={{ __html: props.title }}></h1>
                            </Card.Title>
                        </Col>
                    </Row>
                    <Row>
                        {/* Event Image, and image description */}
                        <Col md={4} xs={12} className='image-container'>
                            <Card.Img src={pic} className="card-image" alt={props.imageAlt} />
                        </Col>
                        <Col md={8} sm={12} xs={12} className='event-text'>
                            <Card.Text dangerouslySetInnerHTML={{ __html: props.description }}></Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    {/* Event Date and location*/}
                    <Row>
                        <Col>
                            <h5 className='event-information' style={{ textAlign: 'right', paddingBottom: '20px' }} dangerouslySetInnerHTML={{ __html: props.date }}></h5>
                        </Col>
                        <Col>
                            <h5 className='event-information' style={{ textAlign: 'left', paddingBottom: '20px' }} dangerouslySetInnerHTML={{ __html: props.location }}></h5>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Events
