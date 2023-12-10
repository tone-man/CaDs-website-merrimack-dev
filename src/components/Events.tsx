
import { Card, Row, Col } from 'react-bootstrap';
import '../css/events.css';
import '../css/homepageCSS/imageModal.css'
import { useEffect, useState } from 'react';

export interface myEventProps {
    type: string,
    image: string,
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
    const [modal, setModal] = useState<null | HTMLElement>(null);
    const [modalImg, setModalImg] = useState<null | HTMLImageElement>(null);
    const [captionText, setCaptionText] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setModal(document.getElementById("myModal") as HTMLElement);
        setModalImg(document.getElementById("img") as HTMLImageElement);
        setCaptionText(document.getElementById("caption") as HTMLElement);
    }, []);

      // Modal Reference: https://www.w3schools.com/howto/howto_css_modal_images.asp
    // Trigger modal when user clicks on image
    function triggerModal() {
        modal as HTMLElement;
        modalImg as HTMLImageElement;
        captionText as HTMLElement;
        if (modal && modalImg && captionText) {
            modal.style.display = "block";
            modalImg.src = props.image;
            captionText.innerHTML = props.caption;
        }

    }

    // When the user clicks on <span> (x), close the modal
    function closeModal() {
        console.log("close modal")
        if (modal) {
            modal.style.display = "none";
        }
    }
    return (
        <div>
            {/* <!-- The Modal for the image--> */}
            <div id="myModal" className="image-modal">
                <span className="image-close" onClick={closeModal}>&times;</span>
                <img className="image-modal-content" id="img" />
                <div id="caption"></div>
            </div>
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
                            <Card.Img src={props.image} className="card-image" alt={`Event ${props.title} Image`} onClick={triggerModal} />
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
