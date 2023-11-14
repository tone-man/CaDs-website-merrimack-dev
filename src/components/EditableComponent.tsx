import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ChangeEvent, useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { child, get, getDatabase, onValue, ref, set, update } from 'firebase/database';

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
function EditableComponent(myProps: editableComponentProps) {
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  const [isNotDeletable, setIsNotDeletable] = useState(false);
  const [maxNestedOrder, setMaxNestedOrder] = useState(0);
  const [shownData, setShownData] = useState('');
  const db = getDatabase();


  // Set the JSON value that will be displayed to the text area whenever myProps change
  useEffect(() => {
    setShownData(JSON.stringify(myProps.data, undefined, 2));
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
 * Handles changes in the text input for a component's data.
 * Note: This function is designed for text area inputs.
 * @param event - The changeevent for the text area.
 * Whenever changing the text input, call this function to send the edits up to the database.
 * Reference: // https://stackoverflow.com/questions/64649055/type-changeeventhtmlinputelement-is-not-assignable-to-type-changeeventhtml
 */
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // Extract the new data from the event
    const newData = event.target.value;

    // Update the local state with the new data
    setShownData(newData);

    // Construct the database path for the current component
    const draftsPath = myProps.pathName + "/" + myProps.componentKey;
    const myRef = ref(db, draftsPath);

    // Set the updated data at the specified key in the database
    set(myRef, JSON.parse(newData))
      .catch((error) => {
        // Handle errors here
        console.error('Error adding data: ', error);
      });
  };


  /**
  * Deletes a component from the database and reorders nested components.
  * @param key - The key of the component to be deleted.
  */
  function deleteComponent(key: string) {
    // Delete the component from the draft
    // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
    const deletePath = myProps.pathName + "/" + key;
    const valueRef = ref(db, deletePath);
    set(valueRef, null);

    // Reorder nested components
    const dbRef = ref(getDatabase());
    get(child(dbRef, myProps.pathName)).then((snapshot) => {
      if (snapshot.exists()) {
        for (const [nestedKey, nestedValue] of Object.entries(snapshot.val())) {
          // If they are in the same grouping
          if (nestedValue.pageOrder === myProps.pageOrder) {
            if (nestedValue.nestedOrder > myProps.nestedOrder) {
              // If the nested component's order is greater than the deleted component's order,
              // update its nestedOrder to maintain the correct order.
              const updates = {};
              updates[myProps.pathName + '/' + nestedKey + '/nestedOrder'] = nestedValue.nestedOrder - 1;
              update(dbRef, updates);
            }
          }
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  /**
  * Reorders nested components in the database based on the specified action.
  * @param isMoveUp - A boolean indicating whether to move the component up.
  */
  function reorderNestedComponents(isMoveUp: boolean) {
    const dbRef = ref(getDatabase());

    // Fetch the existing data to perform reordering
    get(child(dbRef, myProps.pathName)).then((snapshot) => {
      if (snapshot.exists()) {
        const updates = {};
        const direction = isMoveUp ? -1 : 1; // Set the direction based on the action

        // Iterate through the existing components to determine the updates
        for (const [key, value] of Object.entries(snapshot.val())) {
          // If they were in the same grouping
          if (value.pageOrder === myProps.pageOrder && key !== myProps.componentKey) {
            if (myProps.nestedOrder + direction === value.nestedOrder) {
              // If the nested component's order matches the target order,
              // update its nestedOrder to maintain the correct order.
              updates[`${myProps.pathName}/${key}/nestedOrder`] = value.nestedOrder - direction;
            }
          }
        }
        // Update the target component's nestedOrder
        updates[`${myProps.pathName}/${myProps.componentKey}/nestedOrder`] = myProps.nestedOrder + direction;

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

  /**
 * Reorders components based on page order in the database based on the specified action.
 * @param isMoveUp - A boolean indicating whether to move the component up.
 */
  function reorderPageComponents(isMoveUp: boolean) {
    const dbRef = ref(getDatabase());

    // Fetch the existing data to perform reordering
    get(child(dbRef, myProps.pathName)).then((snapshot) => {
      if (snapshot.exists()) {
        const updates = {};
        const direction = isMoveUp ? -1 : 1; // Set the direction based on the action

        // Iterate through the existing components to determine the updates
        for (const [key, value] of Object.entries(snapshot.val())) {
          // If they were in the same grouping
          if (key != myProps.componentKey) {
            if (value.pageOrder === myProps.pageOrder) {
              updates[`${myProps.pathName}/${key}/pageOrder`] = value.pageOrder + direction;
            }
            else if (myProps.pageOrder - 1 === value.pageOrder && isMoveUp) {
              updates[`${myProps.pathName}/${key}/pageOrder`] = value.pageOrder - direction;
            }
            else if (myProps.pageOrder + 1 === value.pageOrder && !isMoveUp) {
              updates[`${myProps.pathName}/${key}/pageOrder`] = value.pageOrder - direction;
            }
          }
        }
        // Update the target component's nestedOrder
        updates[`${myProps.pathName}/${myProps.componentKey}/pageOrder`] = myProps.pageOrder + direction;

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
    deleteComponent(myProps.componentKey)
    setShowDeletionModal(false);
  }

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + myProps.data.type} />
      <Container>
        <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
          <Button onClick={() => reorderPageComponents(true)} style={{ color: 'red', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-up-short"></i></Button>
        </Col>
        <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
          <Button onClick={() => reorderPageComponents(false)} style={{ color: 'red', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-down-short"></i></Button>
        </Col>
        <Row style={{ marginBottom: '10px', marginTop: '25px' }}>
          <Col md={9} sm={9} xs={6} style={{ textAlign: 'left' }}>
            <h1>{myProps.data.title}</h1>
          </Col>
          <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
            <Button onClick={() => reorderNestedComponents(true)} style={{ color: 'white', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-up-short"></i></Button>
          </Col>
          <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
            <Button style={{ color: 'white', background: 'grey', border: 'none' }} onClick={() => reorderNestedComponents(false)}> <i className="bi bi-arrow-down-short"></i></Button>
          </Col>
          <Col md={1} sm={1} xs={1} style={{ textAlign: 'right' }}>
            <Button style={{ background: 'red', border: 'none' }} onClick={handleOpenConfirmationModal}> <i className="bi bi-trash"></i></Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} >
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control value={shownData} onChange={handleTextAreaChange} as="textarea" rows={10} style={{ resize: 'none', border: '1px black solid' }} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default EditableComponent
