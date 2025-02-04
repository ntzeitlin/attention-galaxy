import { useState } from "react";

export const TaskToDoList = () => {
    const [toDoTask, setToDoTask] = useState({
        id: "",
        toDo: "",
        isComplete: false,
    });
    const [toDoArray, setToDoArray] = useState([]);
    return;
};
