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
                {/* For each Task in a project: 
            Check to see if all items are on hand
            if all items are on hand, then display that
            if not, warn user that items are still needed 
            
            Get all Tasks for current project.. where projectId === taskObject.projectId
            Get all TaskItems for Tasks... Get all taskItems where taskId === taskObject.id
            http://localhost:8088/tasks?projectId=2&_embed=taskitems

            */}
            </Flex>
        </Card>
    );
};
