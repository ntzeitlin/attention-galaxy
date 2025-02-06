import { Card, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getTasksAndTaskItemsByProjectId } from "../../../services/taskService";
import { MiseEnPlaceItemCard } from "./MiseEnPlaceItemCard";

export const MiseEnPlaceListCard = ({ projectId }) => {
    const [taskWithTaskItemArray, setTaskWithTaskItemArray] = useState([]);

    useEffect(() => {
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
