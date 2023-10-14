
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import '../css/events.css';

interface myEventProps {
    imgSource: string,
    caption: string,
    briefDescription: string,
    longerDescription: string,
    link: string
}

function Events(props: myEventProps) {
    return (
        <div>
            <Row>
                <Col xs = {9} md ={6}>
                    <Card style={{background: 'rgb(20, 54, 100)', color: 'white' }} className='text'>
                        <Card.Img variant="top" src={props.imgSource} />
                        <Card.Body>
                            <Card.Title className='card-header'>{props.caption}</Card.Title>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0" >
                                    <Accordion.Header>
                                        <Card.Text style={{color:'black'}} className='text'>{props.briefDescription}</Card.Text>
                                    </Accordion.Header>
                                    <Accordion.Body  className='custom-accordion'>
                                        <Card.Text style={{color:'white'}} >{props.longerDescription}</Card.Text>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                        <Card.Footer className='card-button'>
                            <Button variant='link' >
                                <Card.Link href={props.link}><i style={{fontSize: '2rem', color:'white'}}className="bi bi-link-45deg"></i></Card.Link>
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Events
