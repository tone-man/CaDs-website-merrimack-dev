import EditableEventComponent from "./EditableEventComponent"
import '../css/editableEvent.css'
import { Button, Col, Container, Row } from "react-bootstrap"
import { get, getDatabase, onValue, ref } from "firebase/database"
import { addNestedComponent, reorderPageComponents, deletePageComponents, getMaxPageOrder } from '../utils/editingComponents'
import { useEffect, useState } from "react"
import DeleteConfirmationModal from "./DeleteConfirmationModal"


export interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: unknown,
  componentKey: string,
  pathName: string
}

interface eventCarouselProps {
  array: editableComponentProps[]
  pageOrder: number,
  type: string
}


/**
 * Component for displaying and editing data for a component in a draft.
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableCarousel(myProps: eventCarouselProps) {
  const [buttons, setButtons] = useState<JSX.Element | null>(null);
  const [lastPageOrder, setLastPageOrder] = useState<number | null>(null)
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  

  const db = getDatabase();
  const myRef = ref(db);

  // Sort through the event carousel based on nested order to maintain correct structure
  const sorted = myProps.array.sort(function (a, b) {
    return (
      a.nestedOrder - b.nestedOrder
    );
  });

  // Set the JSON value that will be displayed to the text area whenever myProps change
  useEffect(() => {

    getMaxPageOrder(ref(db, myProps.array[myProps.array.length - 1].pathName),setLastPageOrder)



  }, [myProps]);


  // Set the buttons that will be displayed for an entire carousel
  useEffect(() => {
    // console.log(lastPageOrder, 'LAST PAGE ORDER')
    // console.log(myProps.pageOrder, 'CURRENT PAGE ORDER')

    setButtons(
      <Container style={{ width: '95%' }} className="buttons-container">

        <Row>
          <Col md={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
            <h1> Event Carousel</h1>
          </Col>
        </Row>
        <Row>

          <Col md={6} sm={6} xs={6}>
            <Row>
              <Col md={2} sm={2} xs={5} className='reorder-page-component' >
                <Button disabled={(myProps.pageOrder === 1 || myProps.pageOrder === 0)} onClick={() => reorderPageComponents(true, myRef, myProps.array[myProps.array.length - 1], 'carousel')}> <i className="bi bi-arrow-up-short"></i></Button>
              </Col>
              <Col md={1} sm={1} xs={1} className='reorder-page-component' >
                <Button disabled={(myProps.pageOrder === 0 || myProps.pageOrder === lastPageOrder)} onClick={() => reorderPageComponents(false, myRef, myProps.array[myProps.array.length - 1], 'carousel')}><i className="bi bi-arrow-down-short" /></Button>
              </Col>
            </Row>
          </Col>

          {/* If the user can add to the component, structure the buttons in this way */}
          {myProps.array[0].data.type === 'event' && (

            <Col md={6} sm={6} xs={6}>
              <Row>
                <Col md={10} sm={10} xs={8} style={{ textAlign: 'right' }} className="add-component">
                  <Button onClick={() => addNestedComponent(myProps.array[myProps.array.length - 1], db)}> <i className="bi bi-plus-lg"></i></Button>
                </Col>
                <Col md={2} sm={2} xs={4} style={{ textAlign: 'right' }} className="delete-component">
                  <Button onClick={() => setShowDeletionModal(true)}> <i className="bi bi-trash"></i></Button>
                </Col>
              </Row>
            </Col>
          )}
          {/* If the user CANNOT add to the component, structure the buttons in this way */}
          {myProps.array[0].data.type !== 'event' && (
            <Col md={6} sm={6} xs={6}>
              <Row>
                <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="delete-component">
                  <Button onClick={() => setShowDeletionModal(true)}> <i className="bi bi-trash"></i></Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    )
  }, [lastPageOrder]);

  function remove(){
    deletePageComponents(myProps, myProps.array[myProps.array.length - 1], db, myRef)
    setShowDeletionModal(false);
  }



  return (
   <div>
       <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + 'event carousel'} />
      {buttons}
      <div className="event-carousel-container">
        {
          // Maps each of the editable events in the events array to an editable events item
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
