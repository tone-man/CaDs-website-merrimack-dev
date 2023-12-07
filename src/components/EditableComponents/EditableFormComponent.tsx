import { DatabaseReference } from 'firebase/database';
import { Dispatch, SetStateAction, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import 'quill-mention/dist/quill.mention.css';
import '../../css/editableCSS/editableForm.css'

// References: https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
// Reference: https://codesandbox.io/p/sandbox/react-quill-with-markdown-g8193?file=%2Fsrc%2FEditor.tsx%3A58%2C18

interface formProps {
    label: string;
    value: string;
    changedValue: string;
    myRef: DatabaseReference;
    pathName: string;
    componentKey: string;
    rows: number;
    delete: boolean;
    handleTextAreaChange: any;
    setValue: Dispatch<SetStateAction<string>>;
    handleOpenConfirmationModal?: () => void; // Optional function prop
}

function EditableFormComponent(myProps: formProps) {
    const [editorValidated, setEditorValidated] = useState(true);

    // Reference: https://stackoverflow.com/questions/34673544/sanitize-html-string-without-using-dangerouslysetinnerhtml-for-length-check
    function hasVisibleText(html: string): boolean {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.innerText.trim().length > 0;
    }

    // Quill.register("modules/emoji", Emoji);
    const TOOLBAR_OPTIONS = [
        [
            'bold',
            'italic',
            'underline',
            'strike',
            { 'color': [] },
            { 'background': [] },
            { 'script': 'sub' },
            { 'script': 'super' },
            'blockquote',
            'code-block',
            { 'list': 'ordered' },
            { 'list': 'bullet' },
            'link',
        ],
      ];

    return (
        <div className='editableForm'>
            <Form noValidate validated={editorValidated}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    {myProps.delete === true && (
                        <Row>
                            <Col md={6} sm={6} xs={6}>
                                <Col md={12} sm={12} xs={12}>
                                    <Form.Label className="form-label" id="customFile" aria-required>
                                        <h1 className='metropolisRegular label' dangerouslySetInnerHTML={{ __html: myProps.label }}></h1>
                                    </Form.Label>
                                </Col>
                            </Col>
                            <Col md={6} sm={6} xs={6}>
                                <Col md={12} sm={12} xs={12} style={{ textAlign: 'right' }} className="delete-nested-component">
                                    <Button onClick={myProps.handleOpenConfirmationModal}><i className="bi bi-x-lg"></i></Button>
                                </Col>
                            </Col>
                        </Row>
                    )}
                    {myProps.delete === false && (
                        <Form.Label className="form-label" id="customFile" aria-required>
                            <h1 className='metropolisRegular label' dangerouslySetInnerHTML={{ __html: myProps.label }}></h1>
                        </Form.Label>
                    )}
                    <div className="my-editor">
                    <ReactQuill
                        theme="snow"
                        value={myProps.value}
                        onChange={(text) => {
                            const isEmpty = !hasVisibleText(text);
                            setEditorValidated(!isEmpty); // Set validation based on whether the content is empty
                            myProps.handleTextAreaChange(
                                { target: { value: text } },
                                myProps.changedValue,
                                myProps.setValue,
                                myProps.myRef,
                                myProps.pathName,
                                myProps.componentKey
                            );
                        }}
                        modules={{
                            toolbar: {
                              container: TOOLBAR_OPTIONS
                            },
                           
                          }}
                        style={{ resize: 'none', border: '1px black solid', background: 'white' }}
                    />
                    </div>
                    <Form.Control.Feedback type="invalid" style={{ display: editorValidated ? 'none' : 'block' }}>
                        <h2 className='metropolisRegular extraSmallFont'> Please provide a valid {myProps.label}.</h2>
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        </div>
    );
}

export default EditableFormComponent;
