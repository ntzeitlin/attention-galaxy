import { Card } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getTasksByProjectId } from "../../../services/taskService";

export const TaskListCard = ({ projectId }) => {
    const [taskArray, setTaskArray] = useState([]);

    useEffect(() => {
        getTasksByProjectId(projectId).then((data) => setTaskArray(data));
    }, []);

    return (
        <Card m="4">
            {taskArray.map((taskobject) => {
                return (
                    <Card key={`task-card-${taskobject.id}`}>
                        {taskobject.taskName}
                    </Card>
                );
            })}
        </Card>
    );
};
