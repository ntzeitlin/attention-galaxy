import { Card } from "@radix-ui/themes";
import { Link, useParams } from "react-router-dom";

export const ProjectSummaryCard = ({ projectObject }) => {
    return (
        <Card m="2">
            <Link to={`/project/${projectObject.project?.id}`}>
                {projectObject.project?.name}
            </Link>
        </Card>
    );
};
