
import { ref, set, get, Database} from 'firebase/database';
import { NavigateFunction } from 'react-router-dom';


/**
 * Handles the click event on the "Edit" button.
 *
 * @param db - The Firebase database instance.
 * @param  snapShot - The snapshot object containing data from the database.
 * @param  createNewDraft - Function to create a new draft.
 * @param setShowDraftModal - Function to set the state of the draft modal.
 * @param navigate - Navigates user to a path
 * @param path - The path to the location in the database.
 */
export const handleEditButtonClick = (db: Database,  snapShot: object, createNewDraft, setShowDraftModal, navigate: NavigateFunction, path: string) => {
    const draft = ref(db, path);
    
    // Retrieve data from the database
    get(draft)
        .then((snapshot) => {
              // If no draft exists at the specified path, create a new draft
            if (snapshot.val() === null) {
                createNewDraft(true, db, snapShot, navigate, path);
            } else {
                // Else display a modal to ask the user what to do
                setShowDraftModal(true);
            }
        })
        .catch((error) => {
            console.error('Error reading data: ', error);
        });
};

/**
 * Either creates a new draft or navigates the user to the edit page
 *
 * @param  makeNewDraft - Indicates whether to create a new draft.
 * @param  db - The Firebase database instance.
 * @param snapShot - The snapshot object containing data to be saved as a draft.
 * @param  navigate - Navigates user to a path
 * @param  path - The path to the location in the database.
 */
export const createNewDraft = (makeNewDraft: boolean, db: Database, snapShot: object, navigate: NavigateFunction, path: string) => {
    // If a new draft should be made
    if (makeNewDraft) {
        // Get the components at the specific page
        const valueRef = ref(db, path +'/');
        // Set the entire path to null to clear any existing data
        set(valueRef, null);

        // For every single component in the snapshot
        for (const [key, value] of Object.entries(snapShot)) {
            const myRef = ref(db, path +`/` + key);

            // Add it to the drafts with the same exact key
            set(myRef, value)
                .then(() => {
                    console.log('Data added successfully!');
                })
                .catch((error) => {
                    console.error('Error adding data: ', error);
                });
        }
    }
    // Route user to the edit page
    navigate('/edit', { state: { pathName: path } });
};