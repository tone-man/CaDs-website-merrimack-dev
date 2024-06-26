import { Button, Col, Container, Row } from "react-bootstrap"
import { useEffect, useState } from "react"

import { getDatabase, ref } from "firebase/database"

import '../../css/editableCSS/editableList.css'

import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal"
import EditableEventComponent, { editableEventProps } from "../EditableComponents/EditableEventComponent"
import { addNestedComponent, reorderPageComponents, deletePageComponents, getMaxPageOrder } from '../../utils/editingComponents'

export interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: editableEventProps,
  componentKey: string,
  pathName: string,
}
interface eventCarouselProps {
  array: editableComponentProps[]
  pageOrder: number,
  type: string,
  addToast: (message: string, type: 'success' | 'warning' | 'danger') => void;
}

/**
 * Component for creating an editable carousel which will allow users to edit events in the carousel
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableCarousel(myProps: eventCarouselProps) {
  
  const [buttons, setButtons] = useState<JSX.Element | null>(null);
  const [lastPageOrder, setLastPageOrder] = useState<number | null>(null);
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);

  const db = getDatabase();
  const myRef = ref(db);
  const componentRef = ref(db, myProps.array[myProps.array.length - 1].pathName)

  // Sort through the event carousel based on nested order to maintain correct structure
  const sorted = myProps.array.sort(function (a, b) {
    return (
      a.nestedOrder - b.nestedOrder
    );
  });

  // Get the max page order for the page
  useEffect(() => {
    getMaxPageOrder(componentRef, setLastPageOrder)
  }, [componentRef, myProps]);


  // Set the buttons that will be displayed for the entire editable carousel
  useEffect(() => {
    setButtons(
      <Container fluid>
        <Row className="buttons-container">
          <Col md={6} sm={6} xs={6}>
            <Row>
              <Col md={2} sm={2} xs={5} className='reorder-page-component' >
                <Button
                  disabled={(myProps.pageOrder === 1 || myProps.pageOrder === 0)}
                  onClick={() =>
                    reorderPageComponents(true, myRef, myProps.array[myProps.array.length - 1])}>
                  <i className="bi bi-arrow-up-short">
                  </i>
                </Button>
              </Col>
              <Col md={1} sm={1} xs={1} className='reorder-page-component' >
                <Button
                  disabled={(myProps.pageOrder === 0 || myProps.pageOrder === lastPageOrder)}
                  onClick={() =>
                    reorderPageComponents(false, myRef, myProps.array[myProps.array.length - 1])}>
                  <i className="bi bi-arrow-down-short" />
                </Button>
              </Col>
            </Row>
          </Col>

          {/* Add nested component button and delete event carousel button */}
          <Col md={6} sm={6} xs={6}>
            <Row>
              <Col md={10} sm={10} xs={9} style={{ textAlign: 'right' }} className="add-component">
                <Button
                  onClick={() =>
                    addNestedComponent(myProps.array[myProps.array.length - 1], db, ref(db, myProps.array[myProps.array.length - 1].pathName), myProps.addToast, "event")}>
                  <i className="bi bi-plus-lg">
                  </i>
                </Button>
              </Col>
              <Col md={2} sm={2} xs={3} style={{ textAlign: 'right' }} className="delete-component">
                <Button
                  onClick={() =>
                    setShowDeletionModal(true)}>
                  <i className="bi bi-trash">
                  </i>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }, [db, lastPageOrder, myProps, myRef]);

  // Function to remove the carousel
  function remove() {
    deletePageComponents(myProps, myProps.array[myProps.array.length - 1], db, myRef, myProps.addToast, "event carousel")
    setShowDeletionModal(false);
  }

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={remove} name={'this ' + 'event carousel'} />
      {buttons}
      <div className="editable-list-container">
        {
          // Maps each of the events in the events array to an editable events component
          sorted.map((element) => (
            <>
              <EditableEventComponent
                key={element.componentKey}
                pageOrder={element.pageOrder}
                nestedOrder={element.nestedOrder}
                componentKey={element.componentKey}
                data={element.data}
                pathName={element.pathName}
                addToast={myProps.addToast}
              />
            </>
          ))
        }
      </div >
    </div>
  )
}
export default EditableCarousel
