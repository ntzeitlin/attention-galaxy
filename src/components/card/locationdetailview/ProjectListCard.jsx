import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { ProjectSummaryCard } from "../ProjectSummaryCard";
import { useNavigate, useParams } from "react-router-dom";
import {
    createNewProject,
    createProjectLocation,
    createUserProjects,
} from "../../../services/projectService";
import { useEffect, useState } from "react";

export const ProjectListCard = ({
    locationProjects,
    locationData,
    currentUser,
}) => {
    const { locationId } = useParams();
    const navigate = useNavigate();

    const handleNewProject = () => {
        let updatedProjectId = null;
        createNewProject()
            .then((data) => {
                updatedProjectId = parseInt(data.id);
                createProjectLocation({
                    locationId: parseInt(locationId),
                    projectId: updatedProjectId,
                });
                createUserProjects({
                    userId: parseInt(currentUser.id),
                    projectId: updatedProjectId,
                    isOwner: true,
                });
            })
            .then(() => {
                navigate(`/project/${updatedProjectId}/edit`, {
                    state: { locationId },
                });
            });
    };

    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    Projects
                </Heading>
                {currentUser.id === locationData.userId ? (
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
                ) : (
                    ""
                )}
            </Flex>

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
