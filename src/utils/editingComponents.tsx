import { ChangeEvent } from 'react';
import { Database, DatabaseReference, child, get, getDatabase, push, ref, set, update } from 'firebase/database'; // Import the appropriate type for DatabaseReference
import EventTemplate from '../utils/events.json'
import { editableComponentProps } from '../components/EditableCarousel';

// Export the function so it can be used in other files
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

  setData(newData);

  const updates = {};

  updates[pathName + '/' + componentKey + beingEdited] = newData;

  // Update the specific keys in the database
  update(dbRef, updates)
    .catch((error) => {
      console.error('Error updating nested orders:', error);
    });
};

/**
   * Adds a new component to the database based on the specified component type.
   * @param componentType - The type of component to be added (e.g., 'project' or 'event' (WILL BE MORE IN FUTURE !)).
   * Reference: https://firebase.google.com/docs/database/web/read-and-write#basic_write
   */
export function addNestedComponent(value: editableComponentProps, db: Database) {
  let newObj = undefined;

  if (value.data.type === 'event') {
    newObj = EventTemplate;
    newObj.group = value.group;
  }


  newObj.pageOrder = value.pageOrder;
  newObj.nestedOrder = value.nestedOrder + 1;


  // Generate a new key for the new component
  const newPostKey = push(child(ref(db), value.pathName)).key;

  const updates = {};

  // Prepare updates for the database
  updates[value.pathName + '/' + newPostKey] = newObj;

  // Perform the update in the database
  return update(ref(db), updates);

}

/**
  * Reorders nested components in the database based on the specified action.
  * @param isMoveUp - A boolean indicating whether to move the component up.
  */
export function reorderNestedComponents(isMoveUp: boolean, dbRef: DatabaseReference, component: editableComponentProps) {

  // Fetch the existing data to perform reordering
  get(child(dbRef, component.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates = {};
      const direction = isMoveUp ? -1 : 1; // Set the direction based on the action

      // Iterate through the existing components to determine the updates
      for (const [key, value] of Object.entries(snapshot.val())) {
        // If they were in the same grouping
        if (value.pageOrder === component.pageOrder && key !== component.componentKey) {
          if (component.nestedOrder + direction === value.nestedOrder) {
            // If the nested component's order matches the target order,
            // update its nestedOrder to maintain the correct order.
            updates[`${component.pathName}/${key}/nestedOrder`] = value.nestedOrder - direction;
          }
        }
      }
      // Update the target component's nestedOrder
      updates[`${component.pathName}/${component.componentKey}/nestedOrder`] = component.nestedOrder + direction;

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
  console.log("got in")
  // Delete the component from the draft
  // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
  const deletePath = component.pathName + "/" + component.componentKey;
  const valueRef = ref(db, deletePath);
  set(valueRef, null);

  // Reorder nested components
  const dbRef = ref(getDatabase());
  get(child(dbRef, component.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      for (const [nestedKey, nestedValue] of Object.entries(snapshot.val())) {
        // If they are in the same grouping
        if (nestedValue.pageOrder === component.pageOrder) {
          if (nestedValue.nestedOrder > component.nestedOrder) {
            // If the nested component's order is greater than the deleted component's order,
            // update its nestedOrder to maintain the correct order.
            const updates = {};
            updates[component.pathName + '/' + nestedKey + '/nestedOrder'] = nestedValue.nestedOrder - 1;
            update(dbRef, updates);
          }
        }
      }
    }
  }).catch((error) => {
    console.error(error);
  });
}

/**
* Reorders components based on page order in the database based on the specified action.
* @param isMoveUp - A boolean indicating whether to move the component up.
*/
export function reorderPageComponents(isMoveUp: boolean, dbRef: DatabaseReference, component, type: string | undefined) {

  if (type !== undefined) {
    if (type === 'carousel') {
      console.log("carousel!!")
    }
  }
  // Fetch the existing data to perform reordering
  get(child(dbRef, component.pathName)).then((snapshot) => {
    console.log("gets in?!!")
    if (snapshot.exists()) {
      const updates = {};
      const direction = isMoveUp ? -1 : 1; // Set the direction based on the action

      // Iterate through the existing components to determine the updates
      for (const [key, value] of Object.entries(snapshot.val())) {
        // If they were in the same grouping
        if (key != component.componentKey) {
          if (value.pageOrder === component.pageOrder) {
            console.log("1!!")
            updates[`${component.pathName}/${key}/pageOrder`] = value.pageOrder + direction;
            if (value.type === 'event') {
              updates[`${component.pathName}/${key}/group`] = value.group + direction;
            }
            console.log("2!!")
          }
          else if (component.pageOrder - 1 === value.pageOrder && isMoveUp) {
            updates[`${component.pathName}/${key}/pageOrder`] = value.pageOrder - direction;
            if (value.type === 'event') {
              updates[`${component.pathName}/${key}/group`] = value.group - direction;
            }
          }
          else if (component.pageOrder + 1 === value.pageOrder && !isMoveUp) {
            updates[`${component.pathName}/${key}/pageOrder`] = value.pageOrder - direction;
            if (value.type === 'event') {
              updates[`${component.pathName}/${key}/group`] = value.group - direction;
            }
          }
        }
      }
      // Update the target component's nestedOrder
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
/**  // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
* Deletes a component from the database and reorders nested components.
* @param key - The key of the component to be deleted.
*/
export function deleteMultiplePageComponents(componentArray, pageComponent: editableComponentProps, db: Database, dbRef: DatabaseReference) {

  // Reorder nested components
  get(child(dbRef, pageComponent.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates = {};
      for (const [key, value] of Object.entries(snapshot.val())) {

        // console.log(pageComponent.group, 'page component here')

        if (value.pageOrder > pageComponent.pageOrder) {
          updates[pageComponent.pathName + '/' + key + '/pageOrder'] = value.pageOrder - 1;
          // console.log(value, 'has bigger page order')
          if (pageComponent.group !== undefined && value.group !== undefined) {
            if (pageComponent.data.type === value.type && value.group > pageComponent.group) {
              updates[pageComponent.pathName + '/' + key + '/group'] = value.group - 1;
              console.log("update occured for ", value)
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
  if (componentArray !== undefined) {
    for (let i = 0; i < componentArray.array.length; i++) {
      const deletePath = componentArray.array[i].pathName + "/" + componentArray.array[i].componentKey + '/';
      console.log(deletePath, 'DELETE PATH')
      const valueRef = ref(db, deletePath);
      set(valueRef, null);
    }
  } else {
    const deletePath = pageComponent.pathName + "/" + pageComponent.componentKey + '/';
    console.log(deletePath, 'DELETE PATH')
    const valueRef = ref(db, deletePath);
    set(valueRef, null);
  }

}

/**  // Reference: https://stackoverflow.com/questions/64419526/how-to-delete-a-node-in-firebase-realtime-database-in-javascript
* Deletes a component from the database and reorders nested components.
* @param key - The key of the component to be deleted.
*/
export function deletePageComponent(pageComponent: editableComponentProps, db: Database, dbRef: DatabaseReference) {

  // Reorder nested components
  get(child(dbRef, pageComponent.pathName)).then((snapshot) => {
    if (snapshot.exists()) {
      const updates = {};
      for (const [key, value] of Object.entries(snapshot.val())) {

        // console.log(pageComponent.group, 'page component here')

        if (value.pageOrder > pageComponent.pageOrder) {
          updates[pageComponent.pathName + '/' + key + '/pageOrder'] = value.pageOrder - 1;
        }
        update(dbRef, updates);
      }
    }
  }).catch((error) => {
    console.error(error);
  });

  const deletePath = pageComponent.pathName + "/" + pageComponent.componentKey + '/';
  console.log(deletePath, 'DELETE PATH')
  const valueRef = ref(db, deletePath);
  set(valueRef, null);
}