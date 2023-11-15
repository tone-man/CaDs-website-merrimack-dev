import EditableEventComponent from "./EditableEventComponent"
import '../css/editableEvent.css'
import { Button, Col, Row } from "react-bootstrap"
import { child, getDatabase, push, ref, set, update } from "firebase/database"
import EventTemplate from '../utils/events.json'

export interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: unknown,
  componentKey: string,
  pathName: string,
  group: number
}

interface eventCarouselProps {
  array: editableComponentProps[]
}


/**
 * Component for displaying and editing data for a component in a draft.
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableCarousel(myProps: eventCarouselProps) {

  const db = getDatabase();

  const sorted = myProps.array.sort(function (a, b) {
    return (
      a.nestedOrder - b.nestedOrder
    );
  });


  /**  // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
   * Deletes a component from the database and reorders nested components.
   * @param key - The key of the component to be deleted.
   */
  function deletePageComponent() {

    for (let i = 0; i < myProps.array.length; i++) {
      const deletePath = myProps.array[i].pathName + "/" + myProps.array[i].componentKey + '/';
      console.log(deletePath, 'DELETE PATH')
      const valueRef = ref(db, deletePath);
      set(valueRef, null);
    }
  }

  /**
     * Adds a new component to the database based on the specified component type.
     * @param componentType - The type of component to be added (e.g., 'project' or 'event' (WILL BE MORE IN FUTURE !)).
     * Reference: https://firebase.google.com/docs/database/web/read-and-write#basic_write
     */
  function addComponent() {
    const value = myProps.array[myProps.array.length - 1]

    const newObj = EventTemplate;
    newObj.pageOrder = value.pageOrder;
    newObj.nestedOrder = value.nestedOrder + 1;
    newObj.group = value.group;


    // Generate a new key for the new component
    const newPostKey = push(child(ref(db), value.pathName)).key;

    const updates ={};

    // Prepare updates for the database
    updates[value.pathName + '/' + newPostKey] = newObj;

    // Perform the update in the database
    return update(ref(db), updates);

  }

  return (
    <div>
      <Row>
        <Col md={6} style={{ textAlign: 'left' }}>
          <h1> Event Carousel {myProps.array[0].group + 1}</h1>
        </Col>

        <Col md={5} style={{ textAlign: 'right' }} className="add-component">
          <Button onClick={addComponent}> <i className="bi bi-plus-lg"></i></Button>
        </Col>
        <Col md={1} style={{ textAlign: 'right' }} className="delete-component">
          <Button onClick={deletePageComponent}> <i className="bi bi-trash"></i></Button>
        </Col>
      </Row>
      <div className="event-carousel-container">
        {
          // Maps each of the events in the events array to a carousel item
          sorted.map((element) => (
            <>
              <EditableEventComponent
                key={element.componentKey}
                pageOrder={element.pageOrder}
                nestedOrder={element.nestedOrder}
                componentKey={element.componentKey}
                data={element.data}
                pathName={element.pathName}
              />
            </>
          ))
        }
      </div >
    </div>
  )
}
export default EditableCarousel
