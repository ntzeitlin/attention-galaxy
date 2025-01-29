import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskByTaskId } from "../../services/taskService";

export const NewTask = () => {
    const { taskId } = useParams();

    const [taskData, setTaskData] = useState({
        id: "",
        taskName: "",
        dateCreated: "",
        dateCompleted: "",
        projectId: "",
        locationId: "",
    });

    useEffect(() => {
        getTaskByTaskId(taskId).then((data) => setTaskData(data));
    }, [taskId]);

    return <>Editing {taskData.taskName}</>;
};
