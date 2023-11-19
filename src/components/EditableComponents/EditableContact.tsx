import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { getDatabase, ref } from 'firebase/database';
import { handleTextAreaChange, reorderPageComponents, deletePageComponents, getMaxPageOrder } from '../../utils/editingComponents';
import '../../css/editableCSS/editableTextComponent.css';
import EditableFormComponent from './EditableFormComponent';

interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: unknown,
  componentKey: string,
  pathName: string,
  type: string
}


/**
 * Component for displaying and editing data for a component in a draft.
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableContact(myProps: editableComponentProps) {
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [lastPageOrder, setLastPageOrder] = useState(null);
  const [buttons, setButtons] = useState<JSX.Element | null>(null);

  const db = getDatabase();
  const myRef = ref(db)
  const componentRef = ref(db, myProps.pathName)


  // Set the JSON value that will be displayed to the text area whenever myProps change
  useEffect(() => {
    setEmail(myProps.data.email);
    setPhoneNumber(myProps.data.phone);
    setLocation(myProps.data.location);

    getMaxPageOrder(componentRef, setLastPageOrder)
  }, [myProps]);



  // Handles confirmed deletion and hiding the modal
  function remove() {
    deletePageComponents(undefined, myProps, db, myRef)
    setShowDeletionModal(false);
  }

  // Render the buttons that will be displayed
  useEffect(() => {
    setButtons(
      <Container style={{ width: '95%' }} className="buttons-container">
        <Row>
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
  }, [lastPageOrder, myProps]);

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + myProps.type} />
      {buttons}
      <Container className='background-container'>
        <Container className='text-editable-container'>
          <h1 className='name' style={{ color: 'white' }}>
         
              <h1 className='title'> Contact Information</h1>
              </h1>
          <Container className='styling'>
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
                  delete={false} />
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
                  delete={false} />
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
                  delete={false} />
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </div >
  )
}
export default EditableContact
