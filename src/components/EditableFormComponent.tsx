import { DatabaseReference } from 'firebase/database'
import { Dispatch, SetStateAction, useState } from 'react'
import { Form } from 'react-bootstrap'


interface formProps {
    label: string
    value: string,
    handleTextAreaChange: any,
    changedValue: string
    setValue: Dispatch<SetStateAction<string>>,
    myRef: DatabaseReference,
    pathName: string,
    componentKey: string
}
/**
 * EditableFormComponent is a functional component that renders a form with a textarea,
 * allowing users to input and edit text based on the provided props.
 *
*/
function EditableFormComponent(myProps: formProps) {
    const [validated, setValidated] = useState(false);

    // Checks validity of the component whenever the user clicks away from the form
    const handleValidity = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <div>
            <Form noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="form-label" id="customFile" aria-required>
                        <h2 className='smallFont metropolisRegular'>{myProps.label}</h2>
                    </Form.Label>
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
                        rows={1}
                        style={{ resize: 'none', border: '1px black solid' }} />
                    <Form.Control.Feedback type="invalid" >
                        <h1 className='extraSmallFont metropolisRegular'> Please provide a valid {myProps.label}.</h1>
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        </div >
    )
}

export default EditableFormComponent
