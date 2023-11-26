import { useState } from "react";
import { Button } from "react-bootstrap";
import FacultyDirectory from "../components/FacultyDirectory";
import useToastContext from "../components/toasts/useToastContext";
const FacultyDirectoryPage = () => {
    const [text, setText] = useState("")
    const addToast = useToastContext();
    function handleClick() {
        addToast("Hey", "success")

    }

    function secondClick() {
        addToast("bye", "danger")
    }
    return (
        <div>
            <Button onClick={handleClick}>as</Button>
            <Button onClick={secondClick}>second click</Button>
            <FacultyDirectory />
        </div>
    );
};

export default FacultyDirectoryPage;