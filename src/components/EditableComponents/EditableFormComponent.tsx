import { DatabaseReference } from 'firebase/database'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import '../../css/editableCSS/editableForm.css'
interface formProps {
    label: string
    value: string,
    changedValue: string
    myRef: DatabaseReference,
    pathName: string,
    componentKey: string
    rows: number,
    delete: boolean
    handleTextAreaChange: any,
    setValue: Dispatch<SetStateAction<string>>,
    handleOpenConfirmationModal?: () => void; // Optional function prop
}
/**
 * EditableFormComponent is a component that renders a form with a textarea that users can edit,
 * Reduces repetitive code
*/
function EditableFormComponent(myProps: formProps) {
    const [validated, setValidated] = useState(false);

    // Checks validity of the component whenever the user clicks away from the form
    // Reference: https://stackoverflow.com/questions/61395873/how-to-use-useeffect-to-update-and-render-the-component
    const handleValidity = (event: React.FocusEvent<HTMLInputElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <div className='editableForm'>
            <Form noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    {/* If you CAN delete this component, add a deletion button*/}
                    {myProps.delete === true && (
                        <Row>
                            <Col md={6} sm={6} xs={6}>
                                <Col md={12} sm={12} xs={12}>
                                    <Form.Label className="form-label" id="customFile" aria-required>
                                        <h1 className='metropolisRegular label' >{myProps.label}</h1>
                                    </Form.Label>
                                </Col>
                            </Col>
                            <Col md={6} sm={6} xs={6}>
                                <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="delete-nested-component">
                                    <Button onClick={myProps.handleOpenConfirmationModal}> <i className="bi bi-x-lg"></i></Button>
                                </Col>
                            </Col>
                        </Row>
                    )}
                    {/* If you cant delete this component, make a normal label */}
                    {myProps.delete === false && (
                        <Form.Label className="form-label" id="customFile" aria-required>
                            <h1 className='metropolisRegular label'>{myProps.label}</h1>
                        </Form.Label>
                    )}
                    <Form.Control
                        required
                        value={myProps.value}
                        onBlur={handleValidity}
                        onChange={(e) =>
                            myProps.handleTextAreaChange(
                                e,
                                myProps.changedValue,
                                myProps.setValue,
                                myProps.myRef,
                                myProps.pathName,
                                myProps.componentKey)}
                        as="textarea"
                        rows={myProps.rows}
                        style={{ resize: 'none', border: '1px black solid' }} />
                    <Form.Control.Feedback type="invalid" >
                        <h2 className='metropolisRegular extraSmallFont'> Please provide a valid {myProps.label}.</h2>
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        </div >
    )
}

export default EditableFormComponent
