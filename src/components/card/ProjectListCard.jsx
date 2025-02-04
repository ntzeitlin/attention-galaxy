import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { ProjectSummaryCard } from "./ProjectSummaryCard";

export const ProjectListCard = ({ locationProjects }) => {
    return (
        <Card>
            <Heading align="center" mt="4">
                Projects
                <Button size="1" mt="1" ml="3">
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
