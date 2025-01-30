/* eslint-disable react/prop-types */
import { Card, Checkbox } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { updateTaskByTaskId } from "../../../services/taskService";
import { Link } from "react-router-dom";

export const TaskOverviewCard = ({
    taskObject,
    fetchAndSetTasks,
    projectId,
}) => {
    const [isComplete, setIsComplete] = useState(false);
    const [cardColor, setCardColor] = useState("white");

    useEffect(() => {
        taskObject.dateCompleted ? setIsComplete(true) : setIsComplete(false);
    }, [taskObject]);

    useEffect(() => {
        isComplete ? setCardColor("blue") : setCardColor("red");
    }, [isComplete]);

    const handleCheck = () => {
        if (taskObject.dateCompleted) {
            updateTaskByTaskId(taskObject.id, {
                id: taskObject.id,
                taskName: taskObject.taskName,
                dateCreated: taskObject.dateCreated,
                dateCompleted: null,
                projectId: taskObject.projectId,
                locationId: taskObject.locationId,
            }).then(() => fetchAndSetTasks());
        }
        if (!taskObject.dateCompleted) {
            updateTaskByTaskId(taskObject.id, {
                id: taskObject.id,
                taskName: taskObject.taskName,
                dateCreated: taskObject.dateCreated,
                dateCompleted: new Date(),
                projectId: taskObject.projectId,
                locationId: taskObject.locationId,
            }).then(() => fetchAndSetTasks());
        }
    };

    return (
        <Card m="2" style={{ background: cardColor }}>
            <Checkbox
                m="1"
                mr="3"
                checked={isComplete}
                onCheckedChange={() => {
                    handleCheck();
                }}
            />
            <Link to={`/task/${taskObject.id}/edit`} state={projectId}>
                {taskObject.taskName}
            </Link>
        </Card>
    );
};
