import {
    AlertDialog,
    Button,
    Card,
    Flex,
    Heading,
    Section,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
    deleteTaskByTaskId,
    getTaskByTaskId,
    getTaskItemsByTaskId,
    updateTaskByTaskId,
} from "../../services/taskService";
import { useNavigate } from "react-router-dom";
import { deleteItemByItemId } from "../../services/inventoryService";

export const EditTaskCard = ({ taskId }) => {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        id: "",
        taskName: "",
        dateCreated: "",
        dateCompleted: "",
        projectId: "",
        locationId: "",
        description: "",
    });

    useEffect(() => {
        getTaskByTaskId(taskId).then((data) => setTaskData(data));
    }, [taskId]);

    const handleSaveTask = () => {
        const submissionObject = {
            taskName: taskData.taskName,
            dateCreated: taskData.dateCreated,
            dateCompleted: taskData.dateCompleted,
            projectId: taskData.projectId,
            locationId: taskData.locationId,
            description: taskData.description,
        };

        updateTaskByTaskId(taskId, submissionObject).then(
            navigate(`/project/${taskData.projectId}`)
        );
    };

    const handleDeleteTask = () => {
        getTaskItemsByTaskId(taskId)
            .then((data) => {
                for (const taskItem of data) {
                    deleteItemByItemId(taskItem.itemId);
                }
            })
            .then(() => {
                deleteTaskByTaskId(taskId).then(() => {
                    navigate(`/project/${taskData.projectId}`);
                });
            });
    };

    return (
        <Card>
            <Heading align="center" mt="4">
                Edit Task
            </Heading>
            <Section>
                <Flex direction="column">
                    <Heading size="4">
                        Location: {taskData.location?.name}
                    </Heading>
                    <Heading size="5">
                        Project: {taskData.project?.name}
                    </Heading>
                    {taskData.dateCompleted ? <>COMPLETED</> : ""}

                    <TextField.Root
                        m="2"
                        size="2"
                        placeholder="Enter Task Name..."
                        value={taskData?.taskName}
                        onChange={(event) => {
                            const taskDataCopy = { ...taskData };
                            taskDataCopy.taskName = event.target.value;
                            setTaskData(taskDataCopy);
                        }}
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>

                    <TextField.Root
                        m="2"
                        size="2"
                        value={taskData?.dateCreated}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>

                    <TextField.Root
                        m="2"
                        size="2"
                        value={taskData?.dateCompleted}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextArea
                        m="2"
                        placeholder="Task Description..."
                        value={taskData?.description}
                        onChange={(event) => {
                            const taskDataCopy = { ...taskData };
                            taskDataCopy.description = event.target.value;
                            setTaskData(taskDataCopy);
                        }}
                    />
                    <Button
                        m="2"
                        onClick={() => {
                            handleSaveTask();
                        }}
                    >
                        Save Task
                    </Button>
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button m="2" color="red">
                                Delete Task
                            </Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content size="1" maxWidth="300px">
                            <AlertDialog.Title>Delete Task</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                Are you sure? This Task and its Items will no
                                longer be available.
                            </AlertDialog.Description>

                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button
                                        variant="solid"
                                        color="red"
                                        onClick={() => {
                                            handleDeleteTask();
                                        }}
                                    >
                                        Delete Task
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </Flex>
            </Section>
        </Card>
    );
};
