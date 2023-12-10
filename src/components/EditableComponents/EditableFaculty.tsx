import { getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react'

import '../../css/editableCSS/editableProject.css'

import DeleteConfirmationModal from '../DeleteConfirmationModal';
import EditableFormComponent from './EditableFormComponent';
import { deleteNestedComponent, getMaxProjectOrder, handleTextAreaChange } from '../../utils/editingComponents';
import EditableImageForm from './EditableImageForm';

interface editableFacultyProps {
    name: string,
    image: string
}
interface editableContributerProps {
    pageOrder: number
    nestedOrder: number
    data: editableFacultyProps,
    componentKey: string,
    pathName: string,
    addToast: (message: string, type: 'success' | 'warning' | 'danger') => void;
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
        setImage(myProps.data.image);
        setName(myProps.data.name);

    }, []);

    // Get max nested order of the faculty carousel
    useEffect(() => {
        getMaxProjectOrder(myProps, db, setLastNestedOrder)
    }, [db, lastNestedOrder, myProps]);

    // Get max nested order of the faculty carousel
    useEffect(() => {
        console.log(lastNestedOrder, 'LAST NESTED ORDER')
    }, [lastNestedOrder]);


    // Handles confirmed deletion and hiding the modal
    function remove() {
        deleteNestedComponent(myProps, db, myProps.addToast, "faculty member")
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
                changedValue='/name'
                myRef={myRef}
                value={name}
                setValue={setName}
                pathName={myProps.pathName}
                componentKey={myProps.componentKey}
                label="Faculty Name"
                handleTextAreaChange={handleTextAreaChange}
                rows={1}
                delete={lastNestedOrder !== 1}
                handleOpenConfirmationModal={handleOpenConfirmationModal} />
            <EditableImageForm
                changedValue='/image'
                myRef={myRef}
                value={image}
                setValue={setImage}
                pathName={myProps.pathName}
                componentKey={myProps.componentKey}
                label="Image URL"
                handleTextAreaChange={handleTextAreaChange} />
        </div>
    )
}

export default EditableFaculty
