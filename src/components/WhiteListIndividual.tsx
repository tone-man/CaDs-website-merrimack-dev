import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Col, Row } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import '../css/whiteListIndividual.css'

// Interface for the user props
export interface userProps {
    userName: string,
    userImage: string
}

// Creates individual persons content for the whitelist container
function WhiteListIndividual(myProps: userProps) {
    return (
        <div>
            <Container fluid className='individual-whitelist'>
                <Row style={{ margin: 'auto' }} className=' ms-auto'>
                    {/* Profile Image */}
                    <Col md={2} sm={12} xs={12} className='margin-auto' >
                        <ProfileImage size='75px' position='mx-auto' />
                    </Col>
                    {/* User Name */}
                    <Col md={8} sm={12} xs={12} style={{ margin: 'auto', textAlign: 'center' }}>
                        <h3>{myProps.userName}</h3>
                    </Col>
                    {/* Edit and Delete Buttons */}
                    <Col md={2} sm={12} xs={12} className='margin-auto'>
                        <Row style={{ padding: '10px' }}>
                            <Button className='edit-button'>Edit</Button>
                        </Row>
                        <Row style={{ padding: '10px' }}>
                            <Button className='delete-button'>Delete</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WhiteListIndividual
