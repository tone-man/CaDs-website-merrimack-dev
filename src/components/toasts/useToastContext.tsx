import { useContext } from 'react';
import ToastContext, { ToastContextType } from './ToastContext';

// Reference: https://latteandcode.medium.com/react-toast-an-implementation-with-the-context-api-and-hooks-f52fa564e4a8
// Custom hook to access the ToastContext and retrieve the addToast function
const useToastContext = (): ((text: string, type: string) => void) => {
  // Retrieve the ToastContext from the context API
  const context = useContext(ToastContext) as ToastContextType;
  if (!context || !context.addToast) {
    // Throw an error if useToastContext is used outside of ToastContextProvider
    throw new Error('useToastContext must be used within a ToastContextProvider');
  }
  // Return the addToast function from the context
  return context.addToast;
};

export default useToastContext;