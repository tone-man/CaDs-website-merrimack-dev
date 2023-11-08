import { Col, Container, Form, Row } from 'react-bootstrap';
import { ChangeEvent } from 'react';

interface editableComponentProps {
  data: string,
  onDataChange: (newData: string) => void;
}
// This component shows the json for a component on a page and gives edit access to users
function EditableComponent(myProps: editableComponentProps) {


  // https://stackoverflow.com/questions/64649055/type-changeeventhtmlinputelement-is-not-assignable-to-type-changeeventhtml
  // Call the parent function, onDataChange, when the user types into the text area
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newData = event.target.value;
    myProps.onDataChange(newData); // Notify the parent component about the data change
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Form style={{ margin: '50px'}}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control defaultValue={myProps.data} onChange={handleTextAreaChange} as="textarea" rows={10} style={{resize: 'none', border: '1px black solid'}} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditableComponent
