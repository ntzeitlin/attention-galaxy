import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getUserProjectByProjectId } from "../../../services/projectService";
import { getTasksAndTaskItemsByProjectId } from "../../../services/taskService";
import { MiseEnPlaceItemCard } from "./MiseEnPlaceItemCard";

export const MiseEnPlaceListCard = ({ currentUser, projectId }) => {
    const [userProjectData, setUserProjectData] = useState({});
    const [taskWithTaskItemArray, setTaskWithTaskItemArray] = useState([]);

    useEffect(() => {
        getUserProjectByProjectId(projectId).then((data) =>
            setUserProjectData(data[0])
        );

        getTasksAndTaskItemsByProjectId(projectId).then((data) =>
            setTaskWithTaskItemArray(data)
        );
    }, [projectId]);

    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    Mise en Place Status
                </Heading>
                {taskWithTaskItemArray.map((taskWithTaskItemObject) => {
                    return (
                        <MiseEnPlaceItemCard
                            key={taskWithTaskItemObject.id}
                            taskWithTaskItemObject={taskWithTaskItemObject}
                        />
                    );
                })}
            </Flex>
        </Card>
    );
};
