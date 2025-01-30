import { Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const ProjectNameCard = ({ projectObject }) => {
    return (
        <Card m="2">
            <Link to={`/project/${projectObject.project?.id}`}>
                {projectObject.project?.name}
            </Link>
        </Card>
    );
};
