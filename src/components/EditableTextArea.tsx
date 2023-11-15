import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { DatabaseReference, child, get, getDatabase, onValue, ref, set, update } from 'firebase/database';
import { handleTextAreaChange, reorderPageComponents, deleteMultiplePageComponents} from '../utils/editingComponents';

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
  const [isNotDeletable, setIsNotDeletable] = useState(false);
  const [maxNestedOrder, setMaxNestedOrder] = useState(0);
  const [contentData, setContentData] = useState('');
  const [labelData, setLabelData] = useState('');
  
  const db = getDatabase();
  const myRef = ref(db)


  // Set the JSON value that will be displayed to the text area whenever myProps change
  useEffect(() => {
    setContentData(myProps.data.content);
    setLabelData(myProps.data.label);
  }, [myProps]);

  useEffect(() => {
    // Create a reference to the database using the provided pathName
    const projects = ref(db, myProps.pathName);

    // Set up a listener to the database using onValue
    // The listener will update the state variable 'snapshot' with the retrieved data
    onValue(projects, (snapshot) => {
      let max = 0;
      let count = 0;
      // Iterate through the retrieved data to find the maximum nested order
      for (const [, value] of Object.entries(snapshot.val())) {
        if (value.pageOrder === myProps.pageOrder) {
          if (value.nestedOrder > max) {
            max = value.nestedOrder;
          }
          count++;
        }
      }
      // Dont allow user to delete component if it is the last event or project
      if (myProps.data.type === 'event' || myProps.data.type === 'project') {
        if (count === 1) {
          setIsNotDeletable(true)
        }
        else {
          setIsNotDeletable(false)
        }
      }
      // Update the state variable with the maximum nested order
      setMaxNestedOrder(max);

    });
  }, [myProps]);


  // Opens the deletion confirmation modal
  function handleOpenConfirmationModal() {
    setShowDeletionModal(true);
  }


  /**
  * Reorders nested components in the database based on the specified action.
  * @param isMoveUp - A boolean indicating whether to move the component up.
  */
  function reorderNestedComponents(isMoveUp: boolean, dbRef: DatabaseReference, component: editableComponentProps) {

    // Fetch the existing data to perform reordering
    get(child(dbRef, component.pathName)).then((snapshot) => {
      if (snapshot.exists()) {
        const updates = {};
        const direction = isMoveUp ? -1 : 1; // Set the direction based on the action

        // Iterate through the existing components to determine the updates
        for (const [key, value] of Object.entries(snapshot.val())) {
          // If they were in the same grouping
          if (value.pageOrder === component.pageOrder && key !== component.componentKey) {
            if (component.nestedOrder + direction === value.nestedOrder) {
              // If the nested component's order matches the target order,
              // update its nestedOrder to maintain the correct order.
              updates[`${component.pathName}/${key}/nestedOrder`] = value.nestedOrder - direction;
            }
          }
        }
        // Update the target component's nestedOrder
        updates[`${component.pathName}/${component.componentKey}/nestedOrder`] = component.nestedOrder + direction;

        // Update the specific keys in the databases
        update(dbRef, updates)
          .catch((error) => {
            console.error("Error updating nested orders:", error);
          });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

 


  // Handles confirmed deletion and hiding the modal
  function remove() {
    deleteMultiplePageComponents(undefined, myProps, db, myRef)
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
          <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
            <Button onClick={() => reorderNestedComponents(true, myRef, myProps)} style={{ color: 'white', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-up-short"></i></Button>
          </Col>
          <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
            <Button style={{ color: 'white', background: 'grey', border: 'none' }} onClick={() => reorderNestedComponents(false, myRef, myProps)}> <i className="bi bi-arrow-down-short"></i></Button>
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
