import { Form } from 'react-bootstrap';

// https://legacy.reactjs.org/docs/refs-and-the-dom.html
// Interface for the text input form group
interface formInputProps {
    controlId: string,
    label: string,
    placeholder: string,
    alt: string,
    required: boolean,
    feedbackMessage: string,
    inputRef?: React.RefObject<HTMLInputElement>;
    type: string,
    default?: string,
    disabled?: boolean,
    setData?: React.Dispatch<React.SetStateAction<string>>; 
}

// This component returns a form group element that's a part of a form. It is intended to reduce repetitive code in forms
const TextInputFormGroup = (myProps: formInputProps) => {

    console.log(myProps.disabled);

    return (
        <Form.Group controlId={myProps.controlId}>
            <Form.Label><h2 className='smallFont metropolisRegular'>{myProps.label}</h2></Form.Label>
            <Form.Control
               onChange={
                myProps.setData 
                  ? (event) => myProps.setData && myProps.setData(event.target.value) 
                  : undefined
              }
                className='extraSmallFont metropolisRegular'
                required={myProps.required}
                type={myProps.type}
                placeholder={myProps.placeholder}
                alt={myProps.alt}
                ref={myProps.inputRef ? myProps.inputRef : null}
                defaultValue={myProps.default ? myProps.default : ''}
                disabled={(myProps.disabled) ?  myProps.disabled : false}
            />
            <Form.Control.Feedback type="invalid">
                <h6 style={{ color: 'white' }}>{myProps.feedbackMessage}</h6>
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextInputFormGroup;