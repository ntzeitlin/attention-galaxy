import { useParams } from "react-router-dom";

import { Container } from "@radix-ui/themes";
import { EditTaskCard } from "./EditTaskCard";

export const NewTask = () => {
    const { taskId } = useParams();

    return (
        <Container width="60%" m="5">
            <EditTaskCard taskId={taskId} />
        </Container>
    );
};
