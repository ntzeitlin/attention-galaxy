import {
    AlertDialog,
    Button,
    Card,
    Flex,
    Heading,
    Section,
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

    const handleSaveTask = (event) => {
        event.preventDefault();
        const submissionObject = {
            taskName: taskData.taskName,
            dateCreated: taskData.dateCreated,
            dateCompleted: taskData.dateCompleted,
            projectId: taskData.projectId,
            locationId: taskData.locationId,
            description: taskData.description,
        };

        updateTaskByTaskId(taskId, submissionObject).then(navigate(-1));
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
            {taskData.dateCompleted ? (
                <Heading align="center" as="h4" mt="3" mb="-8" color="green">
                    COMPLETED!
                </Heading>
            ) : (
                ""
            )}
            <Section>
                <TaskForm
                    taskData={taskData}
                    setTaskData={setTaskData}
                    handleSaveTask={handleSaveTask}
                    handleDeleteTask={handleDeleteTask}
                />
            </Section>
        </Card>
    );
};

const TaskForm = ({
    taskData,
    setTaskData,
    handleSaveTask,
    handleDeleteTask,
}) => {
    return (
        <Flex direction="column">
            <Heading size="4">Location: {taskData.location?.name}</Heading>
            <Heading size="5">Project: {taskData.project?.name}</Heading>

            <form>
                <TextField.Root
                    m="2"
                    size="2"
                    placeholder="Enter Task Name..."
                    value={taskData?.taskName || ""}
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
                    value={taskData?.dateCreated || ""}
                    disabled
                >
                    <TextField.Slot></TextField.Slot>
                </TextField.Root>

                <TextField.Root
                    m="2"
                    size="2"
                    value={taskData?.dateCompleted || ""}
                    disabled
                >
                    <TextField.Slot></TextField.Slot>
                </TextField.Root>
                <TextArea
                    m="2"
                    placeholder="Task Description..."
                    value={taskData?.description || ""}
                    onChange={(event) => {
                        const taskDataCopy = { ...taskData };
                        taskDataCopy.description = event.target.value;
                        setTaskData(taskDataCopy);
                    }}
                />
                <Flex direction="column">
                    <Button
                        type="submit"
                        m="2"
                        onClick={(event) => {
                            handleSaveTask(event);
                        }}
                    >
                        Save Task
                    </Button>
                </Flex>
            </form>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button m="2" color="red">
                        Delete Task
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content size="1" maxWidth="300px">
                    <AlertDialog.Title>Delete Task</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This Task and its Items will no longer be
                        available.
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
    );
};
