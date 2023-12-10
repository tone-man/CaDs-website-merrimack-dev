import { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Reference: https://latteandcode.medium.com/react-toast-an-implementation-with-the-context-api-and-hooks-f52fa564e4a8
export type ToastContextType = {
    addToast: (toast: string, type: string) => void;
};

// Create a context for managing Toasts
const ToastContext = createContext<ToastContextType | null>(null);
export default ToastContext;

// Define a component to provide the Toast context and manage Toasts
export function ToastContextProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<{ message: string; type: string }[]>([]);
    const currentTime = new Date().toLocaleTimeString();

    // Effect to remove the oldest Toast after 3 seconds
    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts((prevToasts) => prevToasts.slice(1));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toasts]);

    // Function to add a Toast to the list
    const addToast = useCallback((toast: string, type: string) => {
        const newToast = {
            message: toast,
            type,
        };

        // Only ever show the newest 5 toasts
        setToasts((prevToasts) => {
            const updatedToasts = [...prevToasts, newToast].slice(-5); // Keep only the latest five toasts
            return updatedToasts;
        });
    }, []);


    // Function to remove a specific Toast
    const removeToast = (indexToRemove: number) => {
        setToasts((prevToasts) => prevToasts.filter((_, index) => index !== indexToRemove));
    };

    const contextValue: ToastContextType = {
        addToast: addToast,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            <ToastContainer
                position="top-end"
                className="p-3"
                style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}
            >
                {toasts.map((toast, index) => (
                    <Toast key={index} bg={toast.type} onClose={() => removeToast(index)}>
                        <Toast.Header>
                            <strong className="me-auto caslonBold">{toast.type === 'success' ? 'Success' : 'Error'}</strong>
                            <small className='caslonRegular'>{currentTime}</small>
                        </Toast.Header>
                        <Toast.Body style={{ color: 'white' }} className='caslonRegular'>{toast.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
            {children}
        </ToastContext.Provider>
    );
}
