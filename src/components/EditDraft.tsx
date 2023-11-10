import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../css/formModal.css'

// Interface for modal
interface editDraftModalProps {
    show: boolean;
    onHide: () => void;
    onCreateDraft: (value: boolean) => void;
    name: string;
}

// Modal that asks the user to confirm if they want to delete a user or not
function EditDraft({ show, onHide, onCreateDraft, name }: editDraftModalProps) {
    const handleCreateNewDraft = () => onCreateDraft(true);
    const handleContinueEditingOldDraft = () => onCreateDraft(false);

    return (

        <Modal show={show} onHide={onHide} centered className='customized-modal' size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1 className='mediumFont metropolisBold'>A draft already exists for {name} for this page? </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className='smallFont metropolisRegular'> Would you like to continue editing the existing draft or create a new one?  </h5>
                <h5 className='extraSmallFont caslonThin' style={{ color: 'yellow' }}> Creating a new one will delete the old one </h5>
            </Modal.Body>
            <Modal.Footer>
                <Row >
                    <Col md={3}>
                        <Button variant="secondary" onClick={onHide} aria-label='Cancel Button' className='extraSmallFont metropolisRegular'>
                            Cancel
                        </Button>
                    </Col>
                    <Col md={3}>
                        <Button variant="light" onClick={handleCreateNewDraft} aria-label='New Draft Button' className='extraSmallFont metropolisRegular'>
                            New Draft
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button type='submit' variant="light" aria-label='Continue Editing Old Draft Button' onClick={handleContinueEditingOldDraft} className='extraSmallFont metropolisRegular'>
                            Continue Editing Old Draft
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}

export default EditDraft;
