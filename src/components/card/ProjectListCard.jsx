import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { ProjectSummaryCard } from "./ProjectSummaryCard";
import { useNavigate, useParams } from "react-router-dom";
import { createNewProject } from "../../services/projectService";

export const ProjectListCard = ({ locationProjects }) => {
    const { locationId } = useParams();
    const navigate = useNavigate();

    const handleNewProject = () => {
        createNewProject().then((data) =>
            navigate(`/project/${data.id}/edit`, { state: { locationId } })
        );
    };

    return (
        <Card>
            <Heading align="center" mt="4">
                Projects
                <Button
                    size="1"
                    mt="1"
                    ml="3"
                    onClick={() => {
                        handleNewProject();
                    }}
                >
                    Add Project
                </Button>
            </Heading>

            <Section>
                <Flex direction="column">
                    {locationProjects.map((projectObject) => {
                        return (
                            <ProjectSummaryCard
                                key={`location-project-${projectObject.project?.id}`}
                                projectObject={projectObject}
                            />
                        );
                    })}
                </Flex>
            </Section>
        </Card>
    );
};
