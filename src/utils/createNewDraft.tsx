import { ref, set, get, Database } from "firebase/database";
import { NavigateFunction } from "react-router-dom";
import User from "../firebase/user";
import { FacultyPage } from "./PageInterfaces";

type AddToastFunction = (
  message: string,
  type: "success" | "warning" | "danger"
) => void;

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
export const handleEditButtonClick = (
  db: Database,
  snapShot: object,
  setShowDraftModal: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  path: string,
  addToast: AddToastFunction
) => {
  const draft = ref(db, path);

  // Retrieve data from the database
  get(draft)
    .then((snapshot) => {
      // If no draft exists at the specified path, create a new draft
      if (snapshot.val() === null) {
        createNewDraft(true, db, snapShot, navigate, path, addToast);
      } else {
        // Else display a modal to ask the user what to do
        setShowDraftModal(true);
      }
    })
    .catch((error) => {
      console.error("Error reading data: ", error);
      addToast("Error retrieving draft", "danger");
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
export const createNewDraft = (
  makeNewDraft: boolean,
  db: Database,
  snapShot: object,
  navigate: NavigateFunction,
  path: string,
  addToast: AddToastFunction
) => {
  // If a new draft should be made
  if (makeNewDraft) {
    // Get the components at the specific page
    const valueRef = ref(db, path + "/");
    // Set the entire path to null to clear any existing data
    set(valueRef, null);

    // For every single component in the snapshot
    for (const [key, value] of Object.entries(snapShot)) {
      const myRef = ref(db, path + `/` + key);

      // Add it to the drafts with the same exact key
      set(myRef, value)
        .then(() => {
          console.log("Data added successfully!");
        })
        .catch((error) => {
          console.error("Error adding data: ", error);
        });
    }
    addToast("Successfully created new draft", "success");
  } else {
    addToast("Retrieved old edit draft successfully", "success");
  }
  // Route user to the edit page
  navigate("/edit", { state: { pathName: path } });
};

/**
 * Generates a faculty page with header content filled in based on the user's information.
 *
 * @param user - The user information.
 * @returns The generated faculty page.
 */
export const generateFacultyPage = (user: User) => {
  const facultyPage: FacultyPage = {
      components: {
        header: {
          facultyTitle: user.title,
          facultyName: `${user.name.toUpperCase()}`,
          departmentName: user.department,
          imgSource: user.photoURL,
          imageAlt: "imageAlt",
          nestedOrder: 0,
          pageOrder: 0,
          type: "header",
        },
    },
    name: user.name + " Page",
  };

  console.log(facultyPage);
  return facultyPage;
};
