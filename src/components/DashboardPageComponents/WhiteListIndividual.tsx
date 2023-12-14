import { Button, Container, Col, Row } from 'react-bootstrap'
import ProfileImage from '../ProfileImage';
import '../../css/dashboardCSS/whiteListIndividual.css'
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal'; // Import your ConfirmationModal component
import EditUserModal from '../Modals/EditUserModal';
import { useState } from 'react';
import User from '../../firebase/user';

// Interface for the indivual in the whitelist
interface WhiteListIndividualProps {
    user: User
    onDelete: () => void; // onDelete prop 
    onEdit: (user: User) => void;
}

// Creates individual component for those in the whitelist
function WhiteListIndividual({ user, onDelete, onEdit }: WhiteListIndividualProps) {
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);

    // Triggers deletion and closes confirmation modal
    const handleDelete = (): void => {
        console.log(user);
        setShowDeletionModal(false);
        onDelete();
    };

    // Opens the confirmation modal
    function handleOpenConfirmationModal() {
        setShowDeletionModal(true);
    }

    return (
        <div>

            <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={handleDelete} name={user.name} />

            <Container fluid className='individual-whitelist'>
                <Row style={{ margin: 'auto' }} className=' ms-auto'>

                    {/* Profile Image */}
                    <Col md={2} sm={2} xs={4} className='margin-auto' >

                        {/* Pass in user's image if there exists one */}
                        {user.photoURL !== 'img' ?
                            (<ProfileImage size='60px' position='mx-auto' image={user.photoURL} />)
                            :
                            (<ProfileImage size='60px' position='mx-auto' />)}
                    </Col>

                    {/* User Name */}
                    <Col md={8} sm={12} xs={12} className='name'>
                        <h3 className='smallFont'>{user.name}</h3>
                    </Col>

                    {/* Edit and Delete Buttons */}
                    <Col md={2} sm={12} xs={12} className='margin-auto'>
                        <EditUserModal updateUser={onEdit} user={user} isAdmin={true} />
                        <Row style={{ padding: '10px' }}>
                            <Button className='delete-button' onClick={handleOpenConfirmationModal}>Delete</Button>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default WhiteListIndividual