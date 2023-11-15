import { ChangeEvent } from 'react';
import { Database, DatabaseReference, child, get, getDatabase, push, ref, set, update } from 'firebase/database'; // Import the appropriate type for DatabaseReference
import EventTemplate from '../utils/events.json'
import { editableComponentProps } from '../components/EditableCarousel';

// Reference: https://dev.to/tlylt/exploring-key-string-any-in-typescript-4ake
type UpdatesType = { [key: string]: any };

// Define an interface for the structure of the nested components
interface valueType {
  pageOrder: number
  nestedOrder: number
  data: unknown,
  componentKey: string,
  pathName: string,
}

/**
 * Handles the change event of any editable component on the editable component being changed.
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
  componentKey: string
) => {
  // Extract the new data from the event
  const newData = event.target.value;

  // Update the state data, or data being shown in the editable component, using the setData function
  setData(newData);

  // Create an object to store the updates for the database
  const updates = {};
  updates[pathName + '/' + componentKey + beingEdited] = newData;

  // Update the specific keys in the database using the provided dbRef
  update(dbRef, updates)
    .catch((error) => {
      console.error('Error updating nested orders:', error);
    });
};

/**
 * Adds a new component to the database based on the specified component type.
 * @param value - Object containing properties for the new component.
 * @param db - Reference to the Firebase Realtime Database.
 * Reference: https://firebase.google.com/docs/database/web/read-and-write#basic_write
 */
export function addNestedComponent(value: editableComponentProps, db: Database) {
  let newObj = undefined;

  const component = value as valueType;

  // Check the type of component to be added and set the json template to specified type of component
  if (component.data.type === 'event') {
    newObj = EventTemplate;
    newObj.group = value.group;
  }

  if (newObj !== undefined) {
    // Assign page order and nested order for the new component
    newObj.pageOrder = component.pageOrder;
    newObj.nestedOrder = component.nestedOrder + 1;

    // Generate a new key for the new component
    const newPostKey = push(child(ref(db), component.pathName)).key;

    // Prepare updates for the database
    const updates: UpdatesType = {};
    updates[component.pathName + '/' + newPostKey] = newObj;

    // Perform the update in the database
    return update(ref(db), updates);
  }
}



/**
 * Reorders nested components in the database based on the specified action.
 * @param isMoveUp - A boolean indicating whether to move the component up (true) or down (false).
 * @param dbRef - Reference to the database.
 * @param component - The component to be reordered.
 */
export function reorderNestedComponents(isMoveUp: boolean, dbRef: DatabaseReference, component: editableComponentProps) {
  console.log('reordering nested components');

  get(child(dbRef, component.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates: UpdatesType = {};

      for (const [key, value] of Object.entries(snapshot.val())) {
        const nestedValue = value as valueType;

        // Check if the current nested component is different from the one being reordered
        if (key !== component.componentKey) {
          // Check if the two components are the same page order
          const isSamePageOrder = nestedValue.pageOrder === component.pageOrder;

          // Conditions to swap positions between adjacent nested components
          if (isSamePageOrder && (
            (isMoveUp && nestedValue.nestedOrder === component.nestedOrder - 1) ||
            (!isMoveUp && nestedValue.nestedOrder === component.nestedOrder + 1)
          )) {
            // Swap nestedOrder values to reposition the components
            updates[`${component.pathName}/${key}/nestedOrder`] = component.nestedOrder;
            updates[`${component.pathName}/${component.componentKey}/nestedOrder`] = nestedValue.nestedOrder;

            break; // Exit the loop after swapping the positions
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
 * @param type - Optional string indicating the type of component.
 */
export function reorderPageComponents(isMoveUp: boolean, dbRef: DatabaseReference, component, type: string | undefined) {
  console.log("reordering page components")

  if (type !== undefined) {
    if (type === 'carousel') {
      console.log("carousel!!")
    }
  }
  // Fetch the existing data to perform reordering
  get(child(dbRef, component.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates: UpdatesType = {};
      const direction = isMoveUp ? -1 : 1; // Set the direction based on the action

      // Iterate through the existing components to determine the updates
      for (const [key, value] of Object.entries(snapshot.val())) {
        const newValue = value as valueType;

        // If the value being checked is NOT the same as the one being reordered
        if (key != component.componentKey) {

          // If the value being looked at is the same page order as the component being reordered, then update it's page order
          //and its grouping as well if necessary
          const isSamePageOrder = newValue.pageOrder === component.pageOrder;
          if (isSamePageOrder) {
            updates[`${component.pathName}/${key}/pageOrder`] = newValue.pageOrder + direction;
            if (newValue.type === 'event') {
              updates[`${component.pathName}/${key}/group`] = newValue.group + direction;
            }
          }

          // Otherwise, check if it is directly below the component we want to reorder, and update it's page ordering and grouping if
          //necessary
          else if (isMoveUp && component.pageOrder - 1 === newValue.pageOrder) {
            updates[`${component.pathName}/${key}/pageOrder`] = newValue.pageOrder - direction;
            if (newValue.type === 'event') {
              updates[`${component.pathName}/${key}/group`] = newValue.group - direction;
            }
          }

          // Otherwise, check if it is directly above the component we want to reorder, and update it's page ordering and grouping if
          //necessary
          else if (!isMoveUp && component.pageOrder + 1 === newValue.pageOrder) {
            updates[`${component.pathName}/${key}/pageOrder`] = newValue.pageOrder - direction;
            if (newValue.type === 'event') {
              updates[`${component.pathName}/${key}/group`] = newValue.group - direction;
            }
          }
        }
      }

      // Update the target component's page order and grouping if necessary
      updates[`${component.pathName}/${component.componentKey}/pageOrder`] = component.pageOrder + direction;
      if (type === 'carousel') {
        updates[`${component.pathName}/${component.componentKey}/group`] = component.group + direction;
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
* Deletes a component from the database and reorders nested components.
* @param key - The key of the component to be deleted.
*/
export function deleteNestedComponent(component: editableComponentProps, db: Database) {
  console.log("deleted nested component")
  // Delete the component from the draft
  // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
 


  // Reorder nested components
  const dbRef = ref(getDatabase());
  let count = 0;
  const updates: UpdatesType = {};
  get(child(dbRef, component.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      for (const [nestedKey, nestedValue] of Object.entries(snapshot.val())) {
        const newNestedValue = nestedValue as valueType;
        // If they are in the same grouping
        if (newNestedValue.pageOrder === component.pageOrder) {
          count++;
          console.log(count, 'count  insides??')
          if (newNestedValue.nestedOrder > component.nestedOrder) {
            // If the nested component's order is greater than the deleted component's order,
            // update its nestedOrder to maintain the correct order.
            updates[component.pathName + '/' + nestedKey + '/nestedOrder'] = newNestedValue.nestedOrder - 1;
            update(dbRef, updates);
          }
        }
      }
      console.log(count, 'count  is here??')
      // If this was the last component, make sure to delete the page order and reorder the page orers
        if (count === 0) {
          deletePageComponents(undefined, component, db, dbRef);
        }
        // Else just delete it regularly 
        else {  
          const deletePath = component.pathName + "/" + component.componentKey;
          const valueRef = ref(db, deletePath);
          set(valueRef, null);
        }
    }
  }).catch((error) => {
    console.error(error);
  });

 
}

/** 
 * // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
 * Deletes a page component from the database and reorders page components & groupings.
 * @param componentArray - Array containing components to be deleted.
 * @param pageComponent - The page component to be deleted and used for reordering nested components.
 * @param db - Reference to the Firebase Realtime Database.
 * @param dbRef - Reference to the specific database node.
 */
export function deletePageComponents(componentArray, pageComponent: editableComponentProps, db: Database, dbRef: DatabaseReference) {
  console.log("DELETE PAGE ORDERING")
 
  // Reorder page components
  get(child(dbRef, pageComponent.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates: UpdatesType = {};
         // Iterate through existing components to reorder based on the specified page component
      for (const [key, value] of Object.entries(snapshot.val())) {

        console.log(pageComponent.group, 'page component here')

        if (value.pageOrder > pageComponent.pageOrder) {
            // Update pageOrder for components with order greater than the deleted component's order
          updates[pageComponent.pathName + '/' + key + '/pageOrder'] = value.pageOrder - 1;

           // Check and update group for components with the same type and greater group value
          if (pageComponent.group !== undefined && value.group !== undefined) {
            if (pageComponent.data.type === value.type && value.group > pageComponent.group) {
              updates[pageComponent.pathName + '/' + key + '/group'] = value.group - 1;
            }
          }
          else {
            console.log("why not tho...")
          }
        }
        update(dbRef, updates);
      }
    }
  }).catch((error) => {
    console.error(error);
  });

   // Delete every single component in a page ordering\
  //  (i.e). Events in an event carousel, accordions in the accordion array
  if (componentArray !== undefined) {
    for (let i = 0; i < componentArray.array.length; i++) {
      const deletePath = componentArray.array[i].pathName + "/" + componentArray.array[i].componentKey + '/';
      console.log(deletePath, 'DELETE PATH')
      const valueRef = ref(db, deletePath);
      set(valueRef, null);
    }
    // Delete just one page value
    // (i.e). A text area component
  } else {
    const deletePath = pageComponent.pathName + "/" + pageComponent.componentKey + '/';
    console.log(deletePath, 'DELETE PATH')
    const valueRef = ref(db, deletePath);
    set(valueRef, null);
  }

}
