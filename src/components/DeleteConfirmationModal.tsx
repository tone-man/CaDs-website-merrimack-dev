import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../css/formModal.css'

// Interface for modal
interface DeleteConfirmationModal {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  userName: string;
}

// Modal that asks the user to confirm if they want to delete a user or not
function DeleteConfirmationModal({ show, onHide, onConfirm, userName }: DeleteConfirmationModal) {
  return (
    
    <Modal show={show} onHide={onHide} centered className='customized-modal'>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>Confirm Deletion</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete user {userName}? </h5>
      </Modal.Body>
      <Modal.Footer>
        <Row className='ml-auto'>
          <Col>
            <Button variant="secondary" onClick={onHide} aria-label='Cancel Button'>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type='submit' variant="light" aria-label='Submit Button' onClick={onConfirm}>
              Delete
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
