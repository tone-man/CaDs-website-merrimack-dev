import { Modal, Button, Row, Col } from 'react-bootstrap';
import '../../css/formModal.css'

// Interface for modal
interface ConfirmDraftModalProps {
    show: boolean;
    onHide: () => void;
    onCreateDraft: (value: boolean) => void;
    name: string;
}

// Modal that asks the user to confirm if they want to edit an old draft or make a new one
function ConfirmDraftModal({ show, onHide, onCreateDraft, name }: ConfirmDraftModalProps) {
    const handleCreateNewDraft = () => onCreateDraft(true);
    const handleContinueEditingOldDraft = () => onCreateDraft(false);

    return (

        <Modal show={show} onHide={onHide} centered className='customized-modal' size="xl" style={{ textAlign: 'center' }}>
            <Modal.Header closeButton>
                <Modal.Title  >
                    <h1 style={{textAlign: 'center'}} className='mediumFont metropolisBold'>A draft already exists for {name} for this page? </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className='smallFont metropolisRegular'> Would you like to continue editing the existing draft or create a new one?  </h5>
                <h5 className='extraSmallFont caslonThin' style={{ color: 'yellow' }}> Creating a new one will delete the old one </h5>
            </Modal.Body>
            <Modal.Footer>
                <Modal.Body>
                    <Row style={{textAlign: 'center'}}>
                        <Col md ={3} sm={3} xs ={4} className='new-draft-button'>
                            <Button variant="secondary" onClick={onHide} aria-label='Cancel Button' className='extraSmallFont metropolisRegular'>
                                Cancel
                            </Button>
                        </Col>
                        <Col md ={3} sm ={3} xs ={6} className='new-draft-button'>
                            <Button variant="light" onClick={handleCreateNewDraft} aria-label='New Draft Button' className='extraSmallFont metropolisRegular'>
                                New Draft
                            </Button>
                        </Col>
                        <Col md ={4} sm ={3} xs ={10} className='new-draft-button'>
                            <Button type='submit' variant="light" aria-label='Continue Editing Old Draft Button' onClick={handleContinueEditingOldDraft} className='extraSmallFont metropolisRegular'>
                                Continue Editing Old Draft
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDraftModal;
