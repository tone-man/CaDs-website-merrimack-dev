import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../css/formModal.css'

// Interface for modal
interface DeleteConfirmationModal {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  name: string;
}

// Modal that asks the user to confirm if they want to delete a user or not
function DeleteConfirmationModal({ show, onHide, onConfirm, name }: DeleteConfirmationModal) {
  return (
    
    <Modal show={show} onHide={onHide} centered className='customized-modal'>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className='mediumFont metropolisBold'>Confirm Deletion</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className='smallFont metropolisRegular'>Are you sure you want to delete {name}? </h5>
      </Modal.Body>
      <Modal.Footer>
        <Row className='ml-auto'>
          <Col>
            <Button variant="secondary" onClick={onHide} aria-label='Cancel Button' className='extraSmallFont metropolisRegular'>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type='submit' variant="light" aria-label='Submit Button' onClick={onConfirm} className='extraSmallFont metropolisRegular'>
              Delete
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
