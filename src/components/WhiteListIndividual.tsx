import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Col, Row } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import '../css/whiteListIndividual.css'
import ConfirmationModal from './ConfirmationModal'; // Import your ConfirmationModal component
import { useState } from 'react';


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
function WhiteListIndividual({ myProps, onDelete }: WhiteListIndividualProps) {

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleConfirm = (): void => {
        // Logic to handle confirmation
        console.log('Confirmed!');
        setShowModal(false);
        onDelete();
    };

    function makeModalVisible() {
        setShowModal(true);
    }
    return (
        <div>

            <ConfirmationModal show={showModal} onHide={() => setShowModal(false)} onConfirm={handleConfirm} userName={myProps.userName}/>

            <Container fluid className='individual-whitelist'>
                <Row style={{ margin: 'auto' }} className=' ms-auto'>
                    {/* Profile Image */}
                    <Col md={2} sm={2} xs={4} className='margin-auto' >
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
                            <Button className='delete-button' onClick={makeModalVisible}>Delete</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WhiteListIndividual
