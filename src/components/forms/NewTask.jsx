import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskByTaskId } from "../../services/taskService";
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
                        <Button m="2" onClick={() => {}}>
                            Save Task
                        </Button>
                        <Button m="2" color="red" onClick={() => {}}>
                            Delete Task
                        </Button>
                    </Flex>
                </Section>
            </Card>
        </Container>
    );
};
