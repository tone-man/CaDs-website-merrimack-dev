import { getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react'

import '../../css/editableCSS/editableProject.css'

import DeleteConfirmationModal from '../DeleteConfirmationModal';
import EditableFormComponent from './EditableFormComponent';
import { deleteNestedComponent, handleTextAreaChange } from '../../utils/editingComponents';
import { getMaxProjectOrder } from '../../utils/editingComponents';

interface editableContributerProps {
    name: string,
    description: string
}
interface editableComponentProps {
    pageOrder: number
    nestedOrder: number
    data: editableContributerProps,
    componentKey: string,
    pathName: string,
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

    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [lastNestedOrder, setLastNestedOrder] = useState()

    // Initialize name and description usestates using data from props in the useEffect (once on initial render).
    useEffect(() => {
        setDescription(myProps.data.description);
        setName(myProps.data.name);
    }, []);

    // Get max nested ordering for the contributers list
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
                delete={lastNestedOrder !==0}
                handleOpenConfirmationModal={handleOpenConfirmationModal} />
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
                delete={false} />
        </div >
    )
}

export default EditableContributers
