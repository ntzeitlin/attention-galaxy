import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
    createNewTask,
    getTasksByProjectId,
} from "../../../services/taskService";
import { TaskOverviewCard } from "../tasks/TaskOverviewCard";
import { useNavigate } from "react-router-dom";
import { getUserProjectByProjectId } from "../../../services/projectService";

export const TaskListCard = ({ projectId, locationData, currentUser }) => {
    const [taskArray, setTaskArray] = useState([]);
    const navigate = useNavigate();
    const [userProjectData, setUserProjectData] = useState({});

    useEffect(() => {
        fetchAndSetTasks();
    }, []);

    useEffect(() => {
        getUserProjectByProjectId(projectId).then((data) =>
            setUserProjectData(data[0])
        );
    }, [projectId]);

    const fetchAndSetTasks = () => {
        getTasksByProjectId(projectId).then((data) => setTaskArray(data));
    };

    const handleNewTask = () => {
        const submissionObject = {
            taskName: "",
            dateCreated: new Date(),
            dateCompleted: null,
            projectId: projectId,
            locationId: locationData.locationId,
        };

        createNewTask(submissionObject).then((data) =>
            navigate(`/task/${data.id}/edit`)
        );
    };

    return (
        <Card>
            <Flex direction="column">
                <Heading mt="4" align="center">
                    Tasks
                </Heading>
                {currentUser.id === userProjectData?.userId ? (
                    <Button
                        mt=""
                        ml="2"
                        size="1"
                        color="green"
                        onClick={() => {
                            handleNewTask();
                        }}
                    >
                        Add Task
                    </Button>
                ) : (
                    ""
                )}
            </Flex>
            {taskArray.map((taskObject) => {
                return (
                    <TaskOverviewCard
                        key={`task-card-${taskObject.id}`}
                        taskObject={taskObject}
                        fetchAndSetTasks={fetchAndSetTasks}
                        projectId={projectId}
                    />
                );
            })}
        </Card>
    );
};
