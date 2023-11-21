import { getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react'

import '../../css/editableCSS/editableProject.css'

import DeleteConfirmationModal from '../DeleteConfirmationModal';
import EditableFormComponent from './EditableFormComponent';
import { deleteNestedComponent, getMaxProjectOrder, handleTextAreaChange } from '../../utils/editingComponents';

interface editableFacultyProps {
    facultyName: string,
    facultyImg: string
}
interface editableContributerProps {
    pageOrder: number
    nestedOrder: number
    data: editableFacultyProps,
    componentKey: string,
    pathName: string,
}

function EditableFaculty(myProps: editableContributerProps) {
    const db = getDatabase();
    const myRef = ref(db)

    // Create useStates for all data that we will be displaying
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [lastNestedOrder, setLastNestedOrder] = useState();

    // Initialize image and name usestates using data from props in the useEffect (once on initial render).
    useEffect(() => {
        setImage(myProps.data.facultyImg);
        setName(myProps.data.facultyName);
    }, []);

    // Get max nested order of the faculty carousel
    useEffect(() => {
        getMaxProjectOrder(myProps,db, setLastNestedOrder) 
    }, [db, lastNestedOrder, myProps]);

    
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
                delete={lastNestedOrder !==0}
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
