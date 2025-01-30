import { Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getProjectAndLocationDataByTaskId,
    getTaskByTaskId,
} from "../../../services/taskService";
import { TaskItemListCard } from "../tasks/TaskItemList";

export const ManageTask = ({ currentUser }) => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const [projectLocationData, setProjectLocationData] = useState({});
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

    useEffect(() => {
        getProjectAndLocationDataByTaskId(taskId).then((data) =>
            setProjectLocationData(data)
        );
    }, [taskId]);

    return (
        <Container width="60%" m="5">
            <Flex gap="4" justify="center">
                <Card>
                    <Heading align="center" mt="4">
                        Task: {taskData?.taskName}
                    </Heading>
                    <Heading size="3">
                        Project: {projectLocationData.project?.name}
                    </Heading>
                    <Heading size="3">
                        Location: {projectLocationData.location?.name}
                    </Heading>
                    <Heading size="3">Created: {taskData?.dateCreated}</Heading>
                    <Heading size="3">
                        Completed: {taskData?.dateCompleted}
                    </Heading>
                    <Heading size="4">
                        Task Description: {taskData?.description}
                    </Heading>
                    <Button
                        color="green"
                        onClick={() => {
                            navigate(`edit`);
                        }}
                    >
                        Edit Task
                    </Button>
                </Card>
                <TaskItemListCard
                    taskId={taskId}
                    locationId={projectLocationData.locationId}
                    currentUser={currentUser}
                />
            </Flex>
        </Container>
    );
};
