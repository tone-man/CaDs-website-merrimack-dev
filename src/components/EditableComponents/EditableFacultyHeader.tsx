import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getDatabase, ref } from 'firebase/database';

import '../../css/editableCSS/editableTextComponent.css'

import EditableFormComponent from './EditableFormComponent';
import { handleTextAreaChange } from '../../utils/editingComponents';

export interface editableHeaderProps {
    departmentName: string,
    facultyName: string,
    facultyTitle: string,
    imgSource: string
}
interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: editableHeaderProps,
    componentKey: string,
    pathName: string,
}

/**
 * Component for displaying and editing data for faculty header
 * Allows edit privileges to users.
 */
function EditableFacultyHeader(myProps: editableComponentProps) {
    const db = getDatabase();
    const myRef = ref(db)

    // Create useStates for all data that we will be displaying
    const [departmentName, setDepartmentName] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [facultyTitle, setFacultyTitle] = useState('');
    const [imgSource, setImageSource] = useState('');

  // Initialize content and label usestates using data from props in the useEffect (once on initial render).
  useEffect(() => {
        setDepartmentName(myProps.data.departmentName);
        setFacultyName(myProps.data.facultyName);
        setFacultyTitle(myProps.data.facultyTitle);
        setImageSource(myProps.data.imgSource);
    }, []);
    

    return (
        <div>
            <Container className='background-container'>
                <Container className='text-editable-container '>
                    <h1 className='title' style={{ color: 'white' }}> Your Information</h1>

                    <Container className='styling'>
                        <EditableFormComponent
                            changedValue='/facultyName'
                            myRef={myRef}
                            value={facultyName}
                            setValue={setFacultyName}
                            pathName={myProps.pathName}
                            componentKey={myProps.componentKey}
                            label="Faculty Name"
                            handleTextAreaChange={handleTextAreaChange}
                            rows={1}
                            delete={false} />
                        <Row>
                            <Col md={6}>
                                <EditableFormComponent
                                    changedValue='/facultyTitle'
                                    myRef={myRef}
                                    value={facultyTitle}
                                    setValue={setFacultyTitle}
                                    pathName={myProps.pathName}
                                    componentKey={myProps.componentKey}
                                    label="Faculty Title"
                                    handleTextAreaChange={handleTextAreaChange}
                                    rows={1}
                                    delete={false} />
                            </Col>
                            <Col md={6}>
                                <EditableFormComponent
                                    changedValue='/departmentName'
                                    myRef={myRef}
                                    value={departmentName}
                                    setValue={setDepartmentName}
                                    pathName={myProps.pathName}
                                    componentKey={myProps.componentKey}
                                    label="Department Name"
                                    handleTextAreaChange={handleTextAreaChange}
                                    rows={1}
                                    delete={false} />
                            </Col>
                        </Row>

                        <EditableFormComponent
                            changedValue='/imgSource'
                            myRef={myRef}
                            value={imgSource}
                            setValue={setImageSource}
                            pathName={myProps.pathName}
                            componentKey={myProps.componentKey}
                            label="Image Source"
                            handleTextAreaChange={handleTextAreaChange}
                            rows={1}
                            delete={false} />
                    </Container>
                </Container>
            </Container>
        </div >
    )
}
export default EditableFacultyHeader
