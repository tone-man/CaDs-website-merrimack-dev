import { ChangeEvent } from 'react';
import { DatabaseReference, update } from 'firebase/database'; // Import the appropriate type for DatabaseReference

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