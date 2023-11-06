import { getDatabase, set, ref } from 'firebase/database';
import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';


interface editableComponentProps {
  data: string,
  onDataChange: (newData: string) => void;
}

function EditableComponent(myProps: editableComponentProps) {

  const [data, setData] = useState(myProps.data);

  const handleTextAreaChange = (event) => {
    console.log('aqui')
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
                <Form.Label  >Example textarea</Form.Label>
                <Form.Control defaultValue={data} onBlur={handleTextAreaChange} as="textarea" rows={10} style={{resize: 'none', border: '1px black solid'}} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default EditableComponent
