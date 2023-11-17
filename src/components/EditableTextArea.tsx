import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import {  getDatabase, ref} from 'firebase/database';
import { handleTextAreaChange, reorderPageComponents, deletePageComponents, getMaxPageOrder } from '../utils/editingComponents';

interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: unknown,
  componentKey: string,
  pathName: string,
}

/**
 * Component for displaying and editing data for a component in a draft.
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableTextArea(myProps: editableComponentProps) {
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  const [contentData, setContentData] = useState('');
  const [labelData, setLabelData] = useState('');
  const [lastPageOrder, setLastPageOrder] = useState(null);
  
  const db = getDatabase();
  const myRef = ref(db)


  // Set the JSON value that will be displayed to the text area whenever myProps change
  useEffect(() => {
    setContentData(myProps.data.content);
    setLabelData(myProps.data.label);
    getMaxPageOrder(myRef,setLastPageOrder);

  }, [myProps]);


  // Opens the deletion confirmation modal
  function handleOpenConfirmationModal() {
    setShowDeletionModal(true);
  }

 
  // Handles confirmed deletion and hiding the modal
  function remove() {
    deletePageComponents(undefined, myProps, db, myRef, undefined)
    setShowDeletionModal(false);
  }

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + myProps.data.type} />
      <Container>
        {myProps.pageOrder !== 0 && (
          <div>
            {myProps.pageOrder !== 1 && (
              <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
                <Button onClick={() => reorderPageComponents(true, myRef, myProps, undefined)} style={{ color: 'red', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-up-short"></i></Button>
              </Col>
            )}
            <div>
              <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
                <Button onClick={() => reorderPageComponents(false, myRef, myProps, undefined)} style={{ color: 'red', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-down-short"></i></Button>
              </Col>
            </div>
          </div>
        )

        }
        <Row style={{ marginBottom: '10px', marginTop: '25px' }}>
        
        <Col md={9} sm={9} xs={6} style={{ textAlign: 'left' }}>
            <h1>{myProps.data.type}</h1>
          </Col>
        
       
          <Col md={1} sm={1} xs={1} style={{ textAlign: 'right' }}>
            <Button style={{ background: 'red', border: 'none' }} onClick={handleOpenConfirmationModal}> <i className="bi bi-trash"></i></Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} >
              <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control value={labelData} onChange={(e) => handleTextAreaChange(e, '/label', setLabelData, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={1} style={{ resize: 'none', border: '1px black solid' }} />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control value={contentData} onChange={(e) => handleTextAreaChange(e, '/content', setContentData, myRef, myProps.pathName, myProps.componentKey)} as="textarea" rows={5} style={{ resize: 'none', border: '1px black solid' }} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div >
  )
}
export default EditableTextArea
