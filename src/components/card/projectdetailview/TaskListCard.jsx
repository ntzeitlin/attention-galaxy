import { Card, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getTasksByProjectId } from "../../../services/taskService";
import { TaskOverviewCard } from "../tasks/TaskOverviewCard";

export const TaskListCard = ({ projectId }) => {
    const [taskArray, setTaskArray] = useState([]);

    useEffect(() => {
        fetchAndSetTasks();
    }, []);

    const fetchAndSetTasks = () => {
        getTasksByProjectId(projectId).then((data) => setTaskArray(data));
    };

    return (
        <Card m="4">
            <Heading size="4" mt="5">
                Tasks:
            </Heading>
            {taskArray.map((taskObject) => {
                return (
                    <TaskOverviewCard
                        key={`task-card-${taskObject.id}`}
                        taskObject={taskObject}
                        fetchAndSetTasks={fetchAndSetTasks}
                    />
                );
            })}
        </Card>
    );
};
