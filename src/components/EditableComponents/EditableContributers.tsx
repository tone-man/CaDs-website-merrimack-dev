import { getDatabase, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
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

function EditableContributers(myProps: editableContributerProps) {
    const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const db = getDatabase();
    const myRef = ref(db)

    // Set the JSON value that will be displayed to the text area whenever myProps change
    useEffect(() => {
        setDescription(myProps.data.description);
        setName(myProps.data.name);
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
                name={'this contributer'} />
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
                delete={true}
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
