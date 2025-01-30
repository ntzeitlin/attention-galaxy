import { useParams } from "react-router-dom";

import { Container, Flex } from "@radix-ui/themes";
import { EditTaskCard } from "./EditTaskCard";
import { TaskItemListCard } from "../card/tasks/TaskItemList";
import { useEffect, useState } from "react";
import { getProjectAndLocationDataByTaskId } from "../../services/taskService";

export const NewTask = ({ currentUser }) => {
    const { taskId } = useParams();

    const [projectLocationData, setProjectLocationData] = useState({});

    useEffect(() => {
        getProjectAndLocationDataByTaskId(taskId).then((data) =>
            setProjectLocationData(data)
        );
    }, [taskId]);

    return (
        <Container width="60%" m="5">
            <Flex gap="4" justify="center">
                <EditTaskCard taskId={taskId} />
                <TaskItemListCard
                    taskId={taskId}
                    locationId={projectLocationData.locationId}
                    currentUser={currentUser}
                />
            </Flex>
        </Container>
    );
};
