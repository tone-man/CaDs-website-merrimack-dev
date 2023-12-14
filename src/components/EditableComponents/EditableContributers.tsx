import { getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react'

import '../../css/editableCSS/editableProject.css'

import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import EditableFormComponent from './EditableFormComponent';
import EditableImageForm from './EditableImageForm';

import { deleteNestedComponent, handleTextAreaChange, getMaxProjectOrder} from '../../utils/editingComponents';

interface editableContributerProps {
    name: string,
    description: string,
    image: string
}
interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: editableContributerProps,
    componentKey: string,
    pathName: string,
    addToast: (message: string, type: 'success' | 'warning' | 'danger') => void;
}

/**
 * Component for displaying and editing a contributer
 * Allows edit, deletion, and addition privileges to users.
 */
function EditableContributers(myProps: editableComponentProps) {

    const db = getDatabase();
    const myRef = ref(db)

    // Create useStates for all data that we will be displaying
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [lastNestedOrder, setLastNestedOrder] = useState()

    // Initialize name and description usestates using data from props in the useEffect (once on initial render).
    useEffect(() => {
        setDescription(myProps.data.description);
        setName(myProps.data.name);
        setImage(myProps.data.image)
    }, []);

    // Get max nested ordering for the contributers list
    useEffect(() => {
        getMaxProjectOrder(myProps, db, setLastNestedOrder)
    }, [db, lastNestedOrder, myProps]);


    // Handles confirmed deletion and hiding the modal
    function remove() {
        deleteNestedComponent(myProps, db, myProps.addToast, "contributer")
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
                name={'contributer ' + myProps.data.name} />
            <EditableFormComponent
                changedValue='/name'
                myRef={myRef}
                value={name}
                setValue={setName}
                pathName={myProps.pathName}
                componentKey={myProps.componentKey}
                label="Name"
                handleTextAreaChange={handleTextAreaChange}
                rows={1}
                delete={lastNestedOrder !== 1}
                handleOpenConfirmationModal={handleOpenConfirmationModal}
                required={true} />
            <EditableFormComponent
                changedValue='/description'
                myRef={myRef}
                value={description}
                setValue={setDescription}
                pathName={myProps.pathName}
                componentKey={myProps.componentKey}
                label="Description"
                handleTextAreaChange={handleTextAreaChange}
                rows={5}
                delete={false}
                required={true} />
            <EditableImageForm
                changedValue='/image'
                myRef={myRef}
                value={image}
                setValue={setImage}
                pathName={myProps.pathName}
                componentKey={myProps.componentKey}
                label="Image URL"
                handleTextAreaChange={handleTextAreaChange} />
        </div >
    )
}

export default EditableContributers
