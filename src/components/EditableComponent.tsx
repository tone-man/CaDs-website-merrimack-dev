import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { child, get, getDatabase, ref, set, update } from 'firebase/database';

interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: unknown,
  componentKey: string,
  pathName: string
}
// This component shows the json for a component in a draft and allows edit, deletion, and addition privileges to users
function EditableComponent(myProps: editableComponentProps) {
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  const db = getDatabase();
  const value = JSON.stringify(myProps.data, null, 2)

  // Opens the confirmation modal
  function handleOpenConfirmationModal() {
    setShowDeletionModal(true);
  }


  // https://stackoverflow.com/questions/64649055/type-changeeventhtmlinputelement-is-not-assignable-to-type-changeeventhtml
  // Whenever changing the text input, call this function and send the edits up to the database
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newData = event.target.value;
    const draftsPath = myProps.pathName + "/" + myProps.componentKey;
    const myRef = ref(db, draftsPath);

    // Set the data at the specified key in the database
    set(myRef, JSON.parse(newData))
      .then(() => {
        // Data has been successfully added to the database
        console.log('Data added successfully!');
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error adding data: ', error);
      });

  }


  function deleteFromDatabase(key: string) {

    // Delete the component from the draft
    // https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
    const deletePath = myProps.pathName + "/" + key;
    const valueRef = ref(db, deletePath);
    set(valueRef, null);

    let temp;

    // Reorder nested components
    const dbRef = ref(getDatabase());
    get(child(dbRef, myProps.pathName)).then((snapshot) => {
      if (snapshot.exists()) {
        for (const [key, value] of Object.entries(snapshot.val())) {
          // If they were in the same groupinig
          if (value.pageOrder === myProps.pageOrder) {
            // If the value was 
            if (value.nestedOrder > myProps.nestedOrder) {
              const updates = {};
              updates[myProps.pathName + '/' + key + '/nestedOrder'] = value.nestedOrder - 1;
              update(dbRef, updates);
            }
          }
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }

  // Handles confirmed deletion and hiding the modal
  function remove() {
    deleteFromDatabase(myProps.componentKey)
    setShowDeletionModal(false);
  }

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + myProps.data.type} />
      <Container>

        <Row style={{ marginBottom: '10px', marginTop: '25px', }}>
          <Col md={10} sm={10} xs={10} style={{ textAlign: 'left' }}>
            <h1>{myProps.data.title}</h1>
          </Col>
          <Col md={2} sm={2} xs={2} style={{ textAlign: 'right' }}>
            <Button style={{ background: 'red' }} onClick={handleOpenConfirmationModal}> <i className="bi bi-trash"></i></Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} >
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control defaultValue={value} onChange={handleTextAreaChange} as="textarea" rows={10} style={{ resize: 'none', border: '1px black solid' }} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default EditableComponent
