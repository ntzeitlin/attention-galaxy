import { useParams } from "react-router-dom";

import { Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import { EditTaskCard } from "./EditTaskCard";
import { TaskItemListCard } from "../card/tasks/TaskItemList";

export const NewTask = () => {
    const { taskId } = useParams();

    return (
        <Container width="60%" m="5">
            <Flex gap="4" justify="center">
                <EditTaskCard taskId={taskId} />
                <TaskItemListCard taskId={taskId} />
            </Flex>
        </Container>
    );
};
