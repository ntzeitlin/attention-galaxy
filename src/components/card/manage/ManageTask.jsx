import { Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    getProjectAndLocationDataByTaskId,
    getTaskByTaskId,
} from "../../../services/taskService";
import { TaskItemListCard } from "../tasks/TaskItemList";
import { getUserProjectByProjectAndUserId } from "../../../services/projectService";
import { TaskToDoList } from "../tasks/TaskToDoList";

export const ManageTask = ({ currentUser }) => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const [userProjectData, setUserProjectData] = useState({});

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

    useEffect(() => {
        if (projectLocationData.projectId && currentUser.id) {
            getUserProjectByProjectAndUserId(
                projectLocationData?.projectId,
                currentUser?.id
            ).then((data) => setUserProjectData(data[0]));
        }
    }, [projectLocationData?.projectId]);

    return (
        <Container width="80%" m="5">
            <Flex gap="4" justify="center" direction="column">
                <Card>
                    <Flex justify="center" direction="column">
                        <Heading align="center" mt="4">
                            Task: {taskData?.taskName}
                        </Heading>
                        {userProjectData?.isOwner ? (
                            <Button
                                my="2"
                                size="1"
                                color="green"
                                onClick={() => {
                                    navigate(`edit`);
                                }}
                            >
                                Edit Task
                            </Button>
                        ) : (
                            ""
                        )}
                    </Flex>
                    <Heading size="3">
                        Project:{" "}
                        <Link to={`/project/${projectLocationData.projectId}`}>
                            {projectLocationData.project?.name}
                        </Link>
                    </Heading>
                    <Heading size="3">
                        Location:{" "}
                        <Link
                            to={`/location/${projectLocationData.locationId}`}
                        >
                            {projectLocationData.location?.name}
                        </Link>
                    </Heading>
                    <Heading size="3">Created: {taskData?.dateCreated}</Heading>
                    <Heading size="3">
                        Completed: {taskData?.dateCompleted}
                    </Heading>
                    <Heading as="h3" size="4">
                        Task Description:
                    </Heading>
                    <Text as="p">{taskData?.description}</Text>
                </Card>
                <TaskItemListCard
                    taskId={taskId}
                    locationId={projectLocationData.locationId}
                    currentUser={currentUser}
                />
                <TaskToDoList />
            </Flex>
        </Container>
    );
};
