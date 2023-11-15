import EditableEventComponent from "./EditableEventComponent"
import '../css/editableEvent.css'
import { Button, Col, Row } from "react-bootstrap"
import {  getDatabase, ref } from "firebase/database"
import { addNestedComponent, reorderPageComponents, deletePageComponents } from '../utils/editingComponents'


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
  const myRef = ref(db);

  const sorted = myProps.array.sort(function (a, b) {
    return (
      a.nestedOrder - b.nestedOrder
    );
  });





  return (
    <div>
      <Row>
        <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
          <Button onClick={() => reorderPageComponents(true, myRef, myProps.array[myProps.array.length - 1], 'carousel')} style={{ color: 'red', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-up-short"></i></Button>
        </Col>
        <Col md={1} sm={1} xs={2} style={{ textAlign: 'right' }}>
          <Button onClick={() => reorderPageComponents(false, myRef, myProps.array[myProps.array.length - 1], 'carousel')} style={{ color: 'red', background: 'grey', border: 'none' }}> <i className="bi bi-arrow-down-short"></i></Button>
        </Col>
        <Col md={6} style={{ textAlign: 'left' }}>
          <h1> Event Carousel {myProps.array[0].group + 1}</h1>
        </Col>

        <Col md={5} style={{ textAlign: 'right' }} className="add-component">
          <Button onClick={() => addNestedComponent(myProps.array[myProps.array.length - 1], db)}> <i className="bi bi-plus-lg"></i></Button>
        </Col>
        <Col md={1} style={{ textAlign: 'right' }} className="delete-component">
          <Button onClick={() => deletePageComponents(myProps, myProps.array[myProps.array.length - 1], db, myRef)}> <i className="bi bi-trash"></i></Button>
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
