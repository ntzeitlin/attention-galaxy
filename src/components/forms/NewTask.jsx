import { useParams } from "react-router-dom";

import { Container, Flex } from "@radix-ui/themes";
import { EditTaskCard } from "./EditTaskCard";

export const NewTask = () => {
    const { taskId } = useParams();

    return (
        <Container width="60%" m="5">
            <Flex gap="4" justify="center">
                <EditTaskCard taskId={taskId} />
            </Flex>
        </Container>
    );
};
