import { Button, Col, Container, Row } from 'react-bootstrap';
import { getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

import '../../css/editableCSS/editableList.css';

import EditableProject from './EditableProject';
import { addNestedComponent, reorderPageComponents, getMaxPageOrder } from '../../utils/editingComponents';

export interface editableComponentProps {
  pageOrder: number
  nestedOrder: number
  data: unknown,
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
 * Component that holds the editable project components
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableProjectList(myProps: eventCarouselProps) {
  const db = getDatabase();
  const myRef = ref(db);
  const componentRef = ref(db, myProps.array[myProps.array.length - 1].pathName)

  const [buttons, setButtons] = useState<JSX.Element | null>(null);
  const [lastPageOrder, setLastPageOrder] = useState<number | null>(null);

  // Get the max page order for the page
  useEffect(() => {
    getMaxPageOrder(componentRef, setLastPageOrder)
  }, [componentRef, myProps]);

  // Set the buttons that will be displayed for the project list
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

          {/*Add project to project list button */}
          <Col md={6} sm={6} xs={6}>
            <Row>
              <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="add-component">
                <Button
                  onClick={() =>
                    addNestedComponent(myProps.array[myProps.array.length - 1], db, ref(db, myProps.array[myProps.array.length - 1].pathName), myProps.addToast, "project")}>
                  <i className="bi bi-plus-lg">
                  </i>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }, [db, lastPageOrder, myProps, myRef]);

  // Sort the projects based on nested order to maintain correct structure
  const sorted = myProps.array.sort(function (a, b) {
    return (
      a.nestedOrder - b.nestedOrder
    );
  });

  return (
    <div>
      {buttons}
      <div className="editable-list-container">
        {
          // Maps each of the projects in the project array to an editable project component
          sorted.map((element) => (
            <>
              <EditableProject
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
export default EditableProjectList
