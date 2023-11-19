import { getDatabase, ref} from 'firebase/database';
import  { useEffect, useState } from 'react'
import EditableFormComponent from './EditableFormComponent';
import { deleteNestedComponent, handleTextAreaChange } from '../../utils/editingComponents';
import '../../css/editableCSS/editableProject.css'
import DeleteConfirmationModal from '../DeleteConfirmationModal';

interface editableContributerProps {
    pageOrder: number
    nestedOrder: number
    data: unknown,
    componentKey: string,
    pathName: string,
}

function EditableFaculty(myProps: editableContributerProps) {
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const db = getDatabase();
    const myRef = ref(db)

    // Set the JSON value that will be displayed to the text area whenever myProps change
    useEffect(() => {
        setImage(myProps.data.facultyImg);
        setName(myProps.data.facultyName);
    }, [myProps]);

    // Handles confirmed deletion and hiding the modal
    function remove() {
        deleteNestedComponent(myProps, db)
        setShowDeletionModal(false);
    }
    // Opens the deletion confirmation modal
    function handleOpenConfirmationModal() {
        setShowDeletionModal(true);
    }

    return (
        <div className='individual-contributer'>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeletionModal(false)}
                onConfirm={remove}
                name={'this faculty member'} />
            <EditableFormComponent
                changedValue='/facultyName'
                myRef={myRef}
                value={name}
                setValue={setName}
                pathName={myProps.pathName}
                componentKey={myProps.componentKey}
                label="Faculty Name"
                handleTextAreaChange={handleTextAreaChange}
                rows={1}
                delete={true}
                handleOpenConfirmationModal={handleOpenConfirmationModal} />
            <EditableFormComponent
                changedValue='/facultyImg'
                myRef={myRef}
                value={image}
                setValue={setImage}
                pathName={myProps.pathName}
                componentKey={myProps.componentKey}
                label="Faculty Image"
                handleTextAreaChange={handleTextAreaChange}
                rows={1}
                delete={false} />
        </div >
    )
}

export default EditableFaculty
