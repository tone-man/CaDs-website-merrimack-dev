import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getDatabase, ref } from 'firebase/database';
import { handleTextAreaChange } from '../utils/editingComponents';
import '../css/editableTextComponent.css'
import EditableFormComponent from './EditableFormComponent';

interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: unknown,
    componentKey: string,
    pathName: string,
}


/**
 * Component for displaying and editing data for a component in a draft.
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableFacultyHeader(myProps: editableComponentProps) {
    const [departmentName, setDepartmentName] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [facultyTitle, setFacultyTitle] = useState('');
    const [imgSource, setImageSource] = useState('');

    const db = getDatabase();
    const myRef = ref(db)

    // Set the JSON value that will be displayed to the text area whenever myProps change
    useEffect(() => {
        setDepartmentName(myProps.data.departmentName);
        setFacultyName(myProps.data.facultyName);
        setFacultyTitle(myProps.data.facultyTitle);
        setImageSource(myProps.data.imgSource);
    }, [myProps]);


    return (
        <div>
            <Container className='text-editable-container '>
                <EditableFormComponent
                    changedValue='/departmentName'
                    myRef={myRef}
                    value={departmentName}
                    setValue={setDepartmentName}
                    pathName={myProps.pathName}
                    componentKey={myProps.componentKey}
                    label="Department Name"
                    handleTextAreaChange={handleTextAreaChange} />

                <EditableFormComponent
                    changedValue='/facultyName'
                    myRef={myRef}
                    value={facultyName}
                    setValue={setFacultyName}
                    pathName={myProps.pathName}
                    componentKey={myProps.componentKey}
                    label="Faculty Name"
                    handleTextAreaChange={handleTextAreaChange} />


                <EditableFormComponent
                    changedValue='/facultyTitle'
                    myRef={myRef}
                    value={facultyTitle}
                    setValue={setFacultyTitle}
                    pathName={myProps.pathName}
                    componentKey={myProps.componentKey}
                    label="Faculty Title"
                    handleTextAreaChange={handleTextAreaChange} />

                <EditableFormComponent
                    changedValue='/imgSource'
                    myRef={myRef}
                    value={imgSource}
                    setValue={setImageSource}
                    pathName={myProps.pathName}
                    componentKey={myProps.componentKey}
                    label="Image Source"
                    handleTextAreaChange={handleTextAreaChange} />
            </Container>
        </div >
    )
}
export default EditableFacultyHeader
