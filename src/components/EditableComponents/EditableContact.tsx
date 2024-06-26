import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getDatabase, ref } from 'firebase/database';

import '../../css/editableCSS/editableTextComponent.css';

import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import EditableFormComponent from './EditableFormComponent';
import { handleTextAreaChange, reorderPageComponents, deletePageComponents, getMaxPageOrder } from '../../utils/editingComponents';

export interface editableContactProps {
  phone: string,
  email: string,
  location: string
}

interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: editableContactProps,
  componentKey: string,
  pathName: string,
  type: string
  addToast: (message: string, type: 'success' | 'warning' | 'danger') => void;
}

/**
 * Component for displaying and editing a contact form
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableContact(myProps: editableComponentProps) {

  const db = getDatabase();
  const myRef = ref(db)
  const componentRef = ref(db, myProps.pathName)

  // Create useStates for all data that we will be displaying
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const [buttons, setButtons] = useState<JSX.Element | null>(null);
  const [lastPageOrder, setLastPageOrder] = useState(null);
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);


  // Initialize email, phone, and location usestates using data from props in the useEffect (once on initial render).
  useEffect(() => {
    setEmail(myProps.data.email);
    setPhoneNumber(myProps.data.phone);
    setLocation(myProps.data.location);
  }, []);


  // Set last page order using getMaxPageOrder on componentRef and myProps changes.
  useEffect(() => {
    getMaxPageOrder(componentRef, setLastPageOrder)
  }, [componentRef, myProps]);


  // Handles confirmed deletion and hiding the modal
  function remove() {
    deletePageComponents(undefined, myProps, db, myRef, myProps.addToast, "contact template")
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
        <h1 className='title' style={{ color: 'white' }}> Contact Information</h1>
          <Container fluid className='styling'>
            <Row>
              <Col md={12} >
                <EditableFormComponent
                  changedValue='/phone'
                  myRef={myRef}
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  pathName={myProps.pathName}
                  componentKey={myProps.componentKey}
                  label="Phone Number"
                  handleTextAreaChange={handleTextAreaChange}
                  rows={1}
                  delete={false}
                  required={true} />
                <EditableFormComponent
                  changedValue='/email'
                  myRef={myRef}
                  value={email}
                  setValue={setEmail}
                  pathName={myProps.pathName}
                  componentKey={myProps.componentKey}
                  label="Email"
                  handleTextAreaChange={handleTextAreaChange}
                  rows={1}
                  delete={false}
                  required={true} />
                <EditableFormComponent
                  changedValue='/location'
                  myRef={myRef}
                  value={location}
                  setValue={setLocation}
                  pathName={myProps.pathName}
                  componentKey={myProps.componentKey}
                  label="Building/Location"
                  handleTextAreaChange={handleTextAreaChange}
                  rows={1}
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
export default EditableContact
