import { useEffect } from 'react'
import { DatabaseReference } from 'firebase/database';
import { Dispatch, SetStateAction, useState } from 'react';
import {Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import 'quill-mention/dist/quill.mention.css';
import '../../css/editableCSS/editableForm.css'

interface formProps {
    label: string;
    value: string;
    changedValue: string;
    myRef: DatabaseReference;
    pathName: string;
    componentKey: string;
    handleTextAreaChange: any
    setValue: Dispatch<SetStateAction<string>>;
    handleOpenConfirmationModal?: () => void; // Optional function prop
}

function EditableImageForm(myProps: formProps) {

    // Get modal & other information for when user clicks on image
    const [modal, setModal] = useState<null | HTMLElement>(null);
    const [modalImg, setModalImg] = useState<null | HTMLImageElement>(null);
    const [captionText, setCaptionText] = useState<null | HTMLElement>(null);
    const [image, setImage] = useState(myProps.value);

    // Runs on initial render, gets all components for the modal to pass into the project cards
    useEffect(() => {
        setModal(document.getElementById("myModal") as HTMLElement);
        setModalImg(document.getElementById("img") as HTMLImageElement);
        setCaptionText(document.getElementById("caption") as HTMLElement);
        setImage(myProps.value);
    }, []);

    useEffect(() => {
        console.log(myProps.value, 'ay')
        setImage(myProps.value);
    }, [myProps.value]);


    // Modal Reference: https://www.w3schools.com/howto/howto_css_modal_images.asp
    // Trigger modal when user clicks on image
    function triggerModal() {
        modal as HTMLElement;
        modalImg as HTMLElement;
        captionText as HTMLElement;
        if (modal && modalImg && captionText) {
            modal.style.display = "block";
            modalImg.src = image;
            captionText.innerHTML = image ? 'Preview of Image' : 'No Image Available to Preview';
        }
    }

    // When the user clicks on <span> (x), close the modal
    function closeModal() {
        if (modal) {
            modal.style.display = "none";
        }
    }

    return (
        <div>
            {/* <!-- The Modal for the image--> */}
            <div id="myModal" className="image-modal">
                <span className="image-close" onClick={closeModal}>&times;</span>
                <img className="image-modal-content" id="img" />
                <div id="caption"></div>
            </div>
            <div className='editableForm'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="form-label" id="customFile" aria-required>
                            <h1 className='metropolisRegular label'>{myProps.label}
                                <OverlayTrigger
                                    delay={{ hide: 950, show: 150 }}
                                    overlay={(props) => (
                                        <Tooltip {...props} className='overlay'>
                                            Not sure how to upload images? There are many ways, but here are a few:
                                            <ol>
                                                <li>  <a href='https://support.google.com/websearch/answer/118238?hl=en&co=GENIE.Platform%3DDesktop' target='_blank'> Google Images</a> </li>
                                                <li>  <a href='https://www.syncwithtech.org/google-drive-image-urls/' target='_blank'> Google Drive</a></li>
                                            </ol>
                                        </Tooltip>
                                    )}
                                    placement="right">
                                    <i className="bi bi-question-circle" id="question"></i>
                                </OverlayTrigger>
                            </h1>
                        </Form.Label>
                        <div className="my-editor" style={{ height: '100%' }}>
                            <textarea
                                className='image-text'
                                value={myProps.value} // Use the value property to bind the value
                                onChange={(e) => {
                                    const text = e.target.value;
                                    setImage(text);
                                    myProps.handleTextAreaChange(
                                        { target: { value: text } },
                                        myProps.changedValue,
                                        myProps.setValue,
                                        myProps.myRef,
                                        myProps.pathName,
                                        myProps.componentKey
                                    );
                                }}
                                style={{ resize: 'none', border: '1px black solid', background: 'white', width: '100%', height: '100%' }}
                            />
                            <div className='preview' >
                            <Button onClick={triggerModal}>Preview Image</Button>
                            </div>
                        </div>
                    </Form.Group>
                </Form>

            </div>
        </div>
    )
}

export default EditableImageForm
