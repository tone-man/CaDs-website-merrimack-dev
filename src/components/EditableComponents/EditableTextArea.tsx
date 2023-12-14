import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getDatabase, ref } from 'firebase/database';

import '../../css/editableCSS/editableTextComponent.css';

import EditableFormComponent from './EditableFormComponent';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import { handleTextAreaChange, reorderPageComponents, deletePageComponents, getMaxPageOrder } from '../../utils/editingComponents';

export interface editableTextProps {
  content: string;
  label: string;
}
interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: editableTextProps,
  componentKey: string,
  pathName: string,
  type: string,
  addToast: (message: string, type: 'success' | 'warning' | 'danger') => void;
}

/**
 * Component for displaying and editing data in either an accordion or a text area.
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableTextArea(myProps: editableComponentProps) {
  
  const db = getDatabase();
  const myRef = ref(db)
  const componentRef = ref(db, myProps.pathName)

  // Create useStates for all data that we will be displaying
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  const [contentData, setContentData] = useState('');
  const [labelData, setLabelData] = useState('');
  const [lastPageOrder, setLastPageOrder] = useState(null);
  const [buttons, setButtons] = useState<JSX.Element | null>(null);

  // Initialize content and label usestates using data from props in the useEffect (once on initial render).
  useEffect(() => {
    setContentData(myProps.data.content);
    setLabelData(myProps.data.label);
  }, []);

  // Set last page order using getMaxPageOrder function call
  useEffect(() => {
    getMaxPageOrder(componentRef, setLastPageOrder)
  }, [componentRef, myProps]);

  // Handles confirmed deletion and hiding the modal
  function remove() {
    deletePageComponents(undefined, myProps, db, myRef, myProps.addToast, myProps.type === 'text' ? "text area": "accordion")
    setShowDeletionModal(false);
  }

  // Render the buttons that will be displayed
  useEffect(() => {
    setButtons(
      <Container fluid>
        <Row className="buttons-container">
          <Col md={6} sm={6} xs={6}>
            <Row>
              <Col md={2} sm={6} xs={6} className='reorder-page-component' >
                <Button
                  disabled={(myProps.pageOrder === 1 || myProps.pageOrder === 0)}
                  onClick={() =>
                    reorderPageComponents(true, myRef, myProps)}>
                  <i className="bi bi-arrow-up-short">
                  </i>
                </Button>
              </Col>
              <Col md={1} sm={1} xs={1} className='reorder-page-component' >
                <Button
                  disabled={(myProps.pageOrder === 0 || myProps.pageOrder === lastPageOrder)}
                  onClick={() =>
                    reorderPageComponents(false, myRef, myProps)}>
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
  }, [lastPageOrder, myProps, myRef]);

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + myProps.type} />
      {buttons}
      <Container fluid className='background-container'>
      <Container fluid className='text-editable-container'>
        <h1 className='title' style={{ color: 'white' }}>
            {myProps.type === 'text' ? (
              <h1 className='title'> Text Area</h1>) :
              (<h1 className='title'> Drop Down Text</h1>)}</h1>
          <Container fluid className='styling'>
            <Row>
              <Col md={12} >
                <EditableFormComponent
                  changedValue='/label'
                  myRef={myRef}
                  value={labelData}
                  setValue={setLabelData}
                  pathName={myProps.pathName}
                  componentKey={myProps.componentKey}
                  label="Label"
                  handleTextAreaChange={handleTextAreaChange}
                  rows={1}
                  delete={false} 
                  required={true} />
                <EditableFormComponent
                  changedValue='/content'
                  myRef={myRef}
                  value={contentData}
                  setValue={setContentData}
                  pathName={myProps.pathName}
                  componentKey={myProps.componentKey}
                  label="Content"
                  handleTextAreaChange={handleTextAreaChange}
                  rows={4}
                  delete={false} 
                  required={true} />
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </div >
  )
}
export default EditableTextArea
