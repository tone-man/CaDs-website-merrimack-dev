import { ChangeEvent } from 'react';
import { Database, DatabaseReference, child, get, getDatabase, push, ref, set, update } from 'firebase/database'; // Import the appropriate type for DatabaseReference
import EventTemplate from '../utils/events.json'
import ProjectTemplate from '../utils/project.json'
import ContributerTemplate from '../utils/contributer.json'
import FacultyTemplate from '../utils/faculty.json'
import { editableComponentProps } from '../components/EditableComponents/EditableCarousel';

// Reference: https://dev.to/tlylt/exploring-key-string-any-in-typescript-4ake
type UpdatesType = { [key: string]: any };

// Define an interface for the structure of the nested components
interface valueType {
  pageOrder: number
  nestedOrder: number
  data: any,
  componentKey: string,
  pathName: string
}


/**
 * Handles the change event of any editable component
 * Updates state data and the corresponding data in the database.
 * 
 * @param event - The event triggered by the textarea change.
 * @param  beingEdited - The specific piece of data being edited.
 * @param  setData - Function to set state data in React.
 * @param dbRef - Reference to the database.
 * @param pathName - Represents the path to the data in the database.
 * @param  componentKey - Represents the key of the component.
 */
export const handleTextAreaChange = (
  event: ChangeEvent<HTMLTextAreaElement>,
  beingEdited: string,
  setData: React.Dispatch<React.SetStateAction<string>>,
  dbRef: DatabaseReference,
  pathName: string,
  componentKey: string) => {

  const newData = event.target.value;
  const updates: UpdatesType = {};
  updates[pathName + '/' + componentKey + beingEdited] = newData;

  // Update the specific keys in the database using the provided dbRef
  update(dbRef, updates)
    .catch((error) => {
      console.error('Error updating nested orders:', error);
    });

  //Set the data shown in the text area to the newData
  setData(newData);
};

/**
 * Adds a new component to the database based on the specified component type.
 * @param value - Object containing properties for the new component.
 * @param db - Reference to the Firebase Realtime Database.
 * @param dbRef - Reference to the specific path in the database.
 *  * Reference: https://firebase.google.com/docs/database/web/read-and-write#basic_write
 */
export async function addNestedComponent(value: valueType, db: Database, dbRef: DatabaseReference) {
  try {
    let newObj = undefined;
    const component = value as valueType;

    // Asynchronously fetch the max nested order for a specific component
    const nestedOrder = await getMaxNestedOrder(dbRef, component.pageOrder, undefined);

    // Check the type of component to be added and set the json template to specified type of component
    if (component.data.type === 'event') {
      newObj = EventTemplate;
    }
    else if (component.data.type === 'project') {
      newObj = ProjectTemplate;
    }

    if (newObj !== undefined) {
      // Assign page order and nested order for the new component
      newObj.pageOrder = component.pageOrder;
      if (nestedOrder) {
        newObj.nestedOrder = nestedOrder;
      }

      // Generate a new key for the new component
      const newPostKey = push(child(ref(db), component.pathName)).key;

      const updates: UpdatesType = {};
      updates[`${component.pathName}/${newPostKey}`] = newObj;

      // Perform the update in the database
      return update(ref(db), updates);
    } else {
      throw new Error('Error in adding nested component');
    }
  } catch (error) {
    console.error('Error adding nested component:', error);
    throw error;
  }
}

/**
 * Adds a new nested Project component to the database based on the specified component type.
 * @param value - Object containing properties for the new component.
 * @param db - Reference to the Firebase Realtime Database.
 * @param dbRef - Reference to the specific path in the database.
 */
export async function addProjectComponent(value: editableComponentProps, db: Database, isContributer: boolean) {
  try {
    const pathEnding = isContributer == true ? '/contributers/' : '/facultyMembers/'
    let newObj = undefined;
    const component = value as valueType;
    const contributerRef = ref((db), `${component.pathName}/${component.componentKey}${pathEnding}`)

    // Asynchronously fetch the max nested order for a specific component
    const nestedOrder = await getMaxNestedOrder(contributerRef, component.pageOrder, undefined);

    // Check the type of component to be added and set the json template to specified type of component
    if (isContributer === true) {
      newObj = ContributerTemplate;
    }
    else if (isContributer == false) {
      newObj = FacultyTemplate;
    }

    if (newObj !== undefined) {
      // Assign page order and nested order for the new component
      if (nestedOrder) {
        newObj.nestedOrder = nestedOrder;
      }

      // Generate a new key for the new component
      const newPostKey = push(child(ref(db), `${component.pathName}/${component.componentKey}${pathEnding}`)).key;

      const updates: UpdatesType = {};
      updates[`${component.pathName}/${component.componentKey}${pathEnding}${newPostKey}`] = newObj;

      // Perform the update in the database
      return update(ref(db), updates);
    } else {
      throw new Error('Error in adding nested component');
    }
  } catch (error) {
    console.error('Error adding nested component:', error);
    throw error;
  }
}


/**
 * Reorders nested components in the database based on the specified action.
 * @param isMoveUp - A boolean indicating whether to move the component up (true) or down (false).
 * @param dbRef - Reference to the database.
 * @param component - The component to be reordered.
 */
export function reorderNestedComponents(isMoveUp: boolean, dbRef: DatabaseReference, component: editableComponentProps) {
  console.log('Reordering nested components');

  // Fetch the existing data to perform reordering
  get(child(dbRef, component.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates: UpdatesType = {};

      // Iterate through the existing components to determine the updates
      for (const [key, value] of Object.entries(snapshot.val())) {
        const nestedValue = value as valueType;

        // Check if the current nested component is different from the one being reordered
        if (key !== component.componentKey) {
          const isSamePageOrder = nestedValue.pageOrder === component.pageOrder;

          // Conditions to swap positions between adjacent nested components
          if (isSamePageOrder && (
            (isMoveUp && nestedValue.nestedOrder === component.nestedOrder - 1) ||
            (!isMoveUp && nestedValue.nestedOrder === component.nestedOrder + 1)
          )) {
            // Swap nestedOrder values to reposition the components
            updates[`${component.pathName}/${key}/nestedOrder`] = component.nestedOrder;
            updates[`${component.pathName}/${component.componentKey}/nestedOrder`] = nestedValue.nestedOrder;

            break; // Exit the loop 
          }
        }
      }

      // Update the specific keys in the databases
      update(dbRef, updates)
        .catch((error) => {
          console.error("Error updating nested orders:", error);
        });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

/**
 * Reorders components based on page order in the database based on the specified action.
 * @param isMoveUp - A boolean indicating whether to move the component up.
 * @param dbRef - Reference to the database.
 * @param component - The component to be reordered.
 */
export async function reorderPageComponents(
  isMoveUp: boolean,
  dbRef: DatabaseReference,
  component: any,
) {

  try {
    const snapshot = await get(child(dbRef, component.pathName));
    if (snapshot.exists()) {
      const updates: UpdatesType = {};

      for (const [key, value] of Object.entries(snapshot.val())) {
        const newValue = value as valueType;

        const isSamePageOrder = newValue.pageOrder === component.pageOrder;

        // If it is the same page order, decrement/increment the pageOrder based on whether we want to move up or down
        if (isSamePageOrder) {
          if (isMoveUp) {
            updates[`${component.pathName}/${key}/pageOrder`] = newValue.pageOrder - 1;
          } else {
            updates[`${component.pathName}/${key}/pageOrder`] = newValue.pageOrder + 1;
          }
        }
        // If it is not the same page order, check if we want to switch that page orders position with our current component
        else {
          if (isMoveUp) {
            if (newValue.pageOrder + 1 === component.pageOrder) {
              updates[`${component.pathName}/${key}/pageOrder`] = newValue.pageOrder + 1;
            }
          } else if (!isMoveUp) {
            if (newValue.pageOrder - 1 === component.pageOrder) {
              updates[`${component.pathName}/${key}/pageOrder`] = newValue.pageOrder - 1;
            }
          }
        }
      }
      await update(dbRef, updates);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


/**
* Deletes a component from the database and reorders nested components.
* @param component - The component to be deleted.
* @param db - Database reference.
*/
export async function deleteNestedComponent(component: any, db: Database) {
  console.log("Delete nested component");

  // Delete the component from the database
  const deletePath = `${component.pathName}/${component.componentKey}`;
  const valueRef = ref(db, deletePath);
  await set(valueRef, null);

  const dbRef = ref(getDatabase());
  let count = 0;
  const updates: UpdatesType = {};

  try {
    // Fetch snapshot of the components from the same path
    const snapshot = await get(child(dbRef, component.pathName));
    if (snapshot.exists()) {
      for (const [nestedKey, nestedValue] of Object.entries(snapshot.val())) {
        const newNestedValue = nestedValue as valueType;

        // Check if nested components belong to the same grouping as the deleted component
        if (newNestedValue.pageOrder === component.pageOrder && newNestedValue.componentKey !== component.componentKey) {
          count++;

          // If the nested component's order is greater than the deleted component's order,
          // update its nestedOrder to maintain the correct order.
          if (newNestedValue.nestedOrder > component.nestedOrder) {
            updates[`${component.pathName}/${nestedKey}/nestedOrder`] = newNestedValue.nestedOrder - 1;
          }
        }
      }
    }

    await update(dbRef, updates);

    // Check if there are no more components in the same group
    if (count === 0 && component.type !== 'project') {
      // If there are no more components in the group, go through and delete the parent group and reorder accordingly
      await deletePageComponents(undefined, component, db, dbRef);
    }
  } catch (error) {
    console.error(error);
  }
}

/** 
 * // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
 * Deletes a page component from the database and reorders page components & groupings.
 * @param componentArray - Array containing components to be deleted.
 * @param pageComponent - The page component to be deleted and used for reordering nested components.
 * @param db - Reference to the Firebase Realtime Database.
 * @param dbRef - Reference to the specific database node.
 */
export function deletePageComponents(componentArray: any, pageComponent: any, db: Database, dbRef: DatabaseReference) {
  console.log("Delete page component")

  // Reorder page components
  get(child(dbRef, pageComponent.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates: UpdatesType = {};
      // Iterate through existing components to reorder based on the specified page component
      for (const [key, value] of Object.entries(snapshot.val())) {
        const component = value as valueType;
        if (component.pageOrder > pageComponent.pageOrder) {
          // Update pageOrder for components with order greater than the deleted component's order
          updates[pageComponent.pathName + '/' + key + '/pageOrder'] = component.pageOrder - 1;
        }
        update(dbRef, updates);
      }
    }
  }).catch((error) => {
    console.error(error);
  });

  // Delete every single component with given page order
  //  (i.e). All Events in an event carousel
  if (componentArray !== undefined) {
    for (let i = 0; i < componentArray.array.length; i++) {
      const deletePath = componentArray.array[i].pathName + "/" + componentArray.array[i].componentKey + '/';
      const valueRef = ref(db, deletePath);
      set(valueRef, null);
    }
    // Delete just one page value
    // (i.e). A text area component
  } else {
    const deletePath = pageComponent.pathName + "/" + pageComponent.componentKey + '/';
    const valueRef = ref(db, deletePath);
    set(valueRef, null);
  }
}

/**
 * Gets the maximum page order from the database.
 * Optionally updates the last page order using use state if provided.
 * @param dbRef The reference to the database.
 * @param setLastPageOrder A function to set the last page order if provided.
 * @returns Max page order.
 */
export async function getMaxPageOrder(dbRef: DatabaseReference, setLastPageOrder: any) {
  try {
    const snapshot = await get(dbRef); // Assuming "get" is the method you use to fetch data
    let max = 0;
    for (const [, value] of Object.entries(snapshot.val())) {
      const component = value as valueType;
      if (component.pageOrder > max) {
        max = component.pageOrder;
      }
    }
    setLastPageOrder(max);
    return max;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
}

/**
 * Gets the maximum nested order for a given pageOrder from the database.
 * Optionally updates the last nested order use State if provided.
 * @param dbRef The reference to the database.
 * @param pageOrder The page order we are looking to add a nested component to
 * @param setLastNestedOrder A use state function
 * @returns Max nested order
 */
export async function getMaxNestedOrder(dbRef: DatabaseReference, pageOrder: number, setLastNestedOrder: any) {
  try {
    const snapshot = await get(dbRef);
    if (snapshot.val()) {
      let max = 0;
      // Iterate through each component in the snapshot
      for (const [, value] of Object.entries(snapshot.val())) {
        const component = value as valueType;
        if (component.pageOrder === pageOrder) {
          if (component.nestedOrder >= max) {
            max = component.nestedOrder + 1;
          }
        }
      }
      if (setLastNestedOrder) {
        setLastNestedOrder(max - 1);
      }
      return max;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

/**
 * Gets the maximum nested order for either a contributer or faculty component in a project list
 * @param component The component whose nested order we want to know
 * @param setLastNestedOrder A use state function
 * @returns Max nested order
 */
export async function getMaxProjectOrder(component: any, db: Database, setLastNestedOrder: any) {
  try {
    const myRef = ref((db), `${component.pathName}/`)
    const snapshot = await get(myRef);
    if (snapshot.val()) {
      let max = 0;
      // Iterate through each component in the snapshot
      for (const [, value] of Object.entries(snapshot.val())) {
        const component = value as valueType;
        if (component.pageOrder === 0) {
          if (component.nestedOrder >= max) {
            max = component.nestedOrder + 1;
          }
        }
      }
      if (setLastNestedOrder) {
        setLastNestedOrder(max - 1);
      }
      return max;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}