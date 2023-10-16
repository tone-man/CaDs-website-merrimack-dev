
import { Accordion, Button, Card } from 'react-bootstrap';
import '../css/events.css';

export interface myEventProps {
    imgSource: string,
    caption: string,
    briefDescription: string,
    longerDescription: string,
    link: string
}

function Events(props: myEventProps) {
    return (
        <div>
            <Card className='card'>
                <Card.Img variant="top" src={props.imgSource} />
                <Card.Body>
                    <Card.Title className='card-header'>{props.caption}</Card.Title>
                    <Accordion defaultActiveKey="0" >
                        <Accordion.Item eventKey="1" >
                            <Accordion.Header>
                                <Card.Text className='eventText'>{props.briefDescription}</Card.Text>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Card.Text className='eventText'>{props.longerDescription}</Card.Text>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                <Card.Footer className='card-button'>
                    <Button variant='link' >
                        <Card.Link href={props.link}>
                            <i style={{ fontSize: '2rem', color: 'black' }} className="bi bi-link-45deg"></i>
                        </Card.Link>
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Events
