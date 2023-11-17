import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { getDatabase, ref } from 'firebase/database';
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
  const [buttons, setButtons] = useState<JSX.Element | null>(null);

  const db = getDatabase();
  const myRef = ref(db)
  const componentRef = ref(db, myProps.pathName)


  // Set the JSON value that will be displayed to the text area whenever myProps change
  useEffect(() => {
    setContentData(myProps.data.content);
    setLabelData(myProps.data.label);

    getMaxPageOrder(componentRef, setLastPageOrder)
  }, [myProps]);


  // Opens the deletion confirmation modal
  function handleOpenConfirmationModal() {
    setShowDeletionModal(true);
  }


  // Handles confirmed deletion and hiding the modal
  function remove() {
    deletePageComponents(undefined, myProps, db, myRef)
    setShowDeletionModal(false);
  }

  // Set the buttons that will be displayed for an entire carousel
  useEffect(() => {
    setButtons(
      <Container style={{ width: '95%' }} className="buttons-container">

        <Row>
          <Col md={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
            <h1> Text Area</h1>
          </Col>
        </Row>
        <Row>

          <Col md={6} sm={6} xs={6}>
            <Row>
              <Col md={2} sm={2} xs={5} className='reorder-page-component' >
                <Button
                  disabled={(myProps.pageOrder === 1 || myProps.pageOrder === 0)}
                  onClick={() =>
                    reorderPageComponents(true, myRef, myProps, 'text')}>
                  <i className="bi bi-arrow-up-short">
                  </i>
                </Button>
              </Col>
              <Col md={1} sm={1} xs={1} className='reorder-page-component' >
                <Button
                  disabled={(myProps.pageOrder === 0 || myProps.pageOrder === lastPageOrder)}
                  onClick={() =>
                    reorderPageComponents(false, myRef, myProps, 'text')}>
                  <i className="bi bi-arrow-down-short" />
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={6} xs={6}>
            <Row>
              <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="delete-component">
                <Button onClick={() => setShowDeletionModal(true)}> <i className="bi bi-trash"></i></Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }, [lastPageOrder, myProps]);

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + myProps.data.type} />
      <Container>

        {buttons}
        <Row style={{ marginBottom: '10px', marginTop: '25px' }}>
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
