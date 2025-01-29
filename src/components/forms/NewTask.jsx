import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteTaskByTaskId,
    getTaskByTaskId,
    updateTaskByTaskId,
} from "../../services/taskService";
import {
    Button,
    Card,
    Container,
    Flex,
    Heading,
    Section,
    TextArea,
    TextField,
} from "@radix-ui/themes";

export const NewTask = () => {
    const { taskId } = useParams();
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
        deleteTaskByTaskId(taskId).then(
            navigate(`/project/${taskData.projectId}`)
        );
    };

    return (
        <Container width="60%" m="5">
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
                            value={taskData.taskName}
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
                            value={taskData.dateCreated}
                            disabled
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>

                        <TextField.Root
                            m="2"
                            size="2"
                            value={taskData.dateCompleted}
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
                        <Button
                            m="2"
                            color="red"
                            onClick={() => {
                                handleDeleteTask();
                            }}
                        >
                            Delete Task
                        </Button>
                    </Flex>
                </Section>
            </Card>
        </Container>
    );
};
