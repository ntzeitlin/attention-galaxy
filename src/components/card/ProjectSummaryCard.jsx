import { Card } from "@radix-ui/themes";

export const ProjectSummaryCard = ({ projectObject }) => {
    return <Card m="2">{projectObject.project?.name}</Card>;
};
