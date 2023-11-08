import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface editableComponentProps {
  data: string,
  componentKey: string,
  onDataChange: (newData: string) => void;
  onDelete: (path: string) => void;
}
// This component shows the json for a component on a page and gives edit access to users
function EditableComponent(myProps: editableComponentProps) {
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  console.log(myProps.data)



  // Opens the confirmation modal
  function handleOpenConfirmationModal() {
    setShowDeletionModal(true);
  }


  // https://stackoverflow.com/questions/64649055/type-changeeventhtmlinputelement-is-not-assignable-to-type-changeeventhtml
  // Call the parent function, onDataChange, when the user types into the text area
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newData = event.target.value;
    myProps.onDataChange(newData); // Notify the parent component about the data change
  };

  const handleDeletion = () => {
    setShowDeletionModal(false);
    myProps.onDelete(myProps.componentKey); // Notify the parent component about the data change
  };

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={handleDeletion} name={myProps.componentKey} />
      <Container>
        <Row>
          <Col md={12}>
            <Form style={{ margin: '50px' }}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Button className='delete-button' onClick={handleOpenConfirmationModal}> Delete Component</Button>
                <Form.Control defaultValue={myProps.data} onChange={handleTextAreaChange} as="textarea" rows={10} style={{ resize: 'none', border: '1px black solid' }} />

              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditableComponent
