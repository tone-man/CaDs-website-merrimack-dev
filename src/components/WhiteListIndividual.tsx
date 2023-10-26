import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Col, Row } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import '../css/whiteListIndividual.css'

// Interface for the user props
export interface userProps {
    userName: string,
    userImage: string,
    id: number
}

interface WhiteListIndividualProps {
    myProps: {
        userName: string;
        userImage: string;
        id: number;
    };
    onDelete: () => void; // onDelete prop with a function signature
}


// Creates individual persons content for the whitelist container
function WhiteListIndividual({myProps, onDelete}: WhiteListIndividualProps) {
    return (
        <div>
            <Container fluid className='individual-whitelist'>
                <Row style={{ margin: 'auto' }} className=' ms-auto'>
                    {/* Profile Image */}
                    <Col md={2} sm={2} xs={4}  className='margin-auto' >
                        <ProfileImage size='60px' position='mx-auto' />
                    </Col>
                    {/* User Name */}
                    <Col md={8} sm={12} xs={12} className='name'>
                        <h3>{myProps.userName}</h3>
                    </Col>
                    {/* Edit and Delete Buttons */}
                    <Col md={2} sm={12} xs={12} className='margin-auto'>
                        <Row style={{ padding: '10px' }}>
                            <Button className='edit-button'>Edit</Button>
                        </Row>
                        <Row style={{ padding: '10px' }}>
                            <Button className='delete-button' onClick={onDelete}>Delete</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WhiteListIndividual
