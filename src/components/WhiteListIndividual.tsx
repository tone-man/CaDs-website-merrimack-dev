import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Col, Row } from 'react-bootstrap'
import ProfileImage from './ProfileImage';
import '../css/whiteListIndividual.css'
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import your ConfirmationModal component
import EditUserModal from './EditUserModal';
import { useState } from 'react';

// Interface for the users
export interface userProps {
    userName: string,
    userEmail: string,
    userImage: string,
    id: number
}

// Interface for the indivual in the whitelist
interface WhiteListIndividualProps {
    myProps: {
        userName: string;
        userEmail: string,
        userImage: string;
        id: number;
    };
    onDelete: () => void; // onDelete prop 
    onEdit: (id: number, name: string, email: string, image: string) => void;
}

// Creates individual component for those in the whitelist
function WhiteListIndividual({ myProps, onDelete, onEdit }: WhiteListIndividualProps) {
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);

    // Triggers deletion and closes confirmation modal
    const handleDelete = (): void => {
        setShowDeletionModal(false);
        onDelete();
    };

    // Opens the confirmation modal
    function handleOpen() {
        setShowDeletionModal(true);
    }

    return (
        <div>

            <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={handleDelete} userName={myProps.userName} />

            <Container fluid className='individual-whitelist'>
                <Row style={{ margin: 'auto' }} className=' ms-auto'>

                    {/* Profile Image */}
                    <Col md={2} sm={2} xs={4} className='margin-auto' >

                        {/* Pass in user's image if there exists one */}
                        {myProps.userImage !== 'img' ?
                            (<ProfileImage size='60px' position='mx-auto' image={myProps.userImage} />) 
                            :
                            (<ProfileImage size='60px' position='mx-auto' />)}
                    </Col>

                    {/* User Name */}
                    <Col md={8} sm={12} xs={12} className='name'>
                        <h3>{myProps.userName}</h3>
                    </Col>

                    {/* Edit and Delete Buttons */}
                    <Col md={2} sm={12} xs={12} className='margin-auto'>
                        <EditUserModal editUser={onEdit} id={myProps.id} name={myProps.userName} email={myProps.userEmail} />
                        <Row style={{ padding: '10px' }}>
                            <Button className='delete-button' onClick={handleOpen}>Delete</Button>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default WhiteListIndividual