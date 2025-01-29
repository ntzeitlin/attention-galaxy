import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { ProjectSummaryCard } from "./ProjectSummaryCard";
import { useNavigate, useParams } from "react-router-dom";
import {
    createNewProject,
    createProjectLocation,
    createUserProjects,
} from "../../services/projectService";
import { useState } from "react";

export const ProjectListCard = ({ locationProjects, currentUser }) => {
    const { locationId } = useParams();
    const navigate = useNavigate();

    const [projectLocationData, setProjectLocationData] = useState({
        locationId: parseInt(locationId),
        projectId: "",
    });

    const [userProjectsData, setUserProjectsData] = useState({
        projectId: "",
        userId: parseInt(currentUser.id),
        isOwner: true,
    });

    const handleNewProject = () => {
        createNewProject().then((data) => {
            const copyProjectLocationData = { ...projectLocationData };
            copyProjectLocationData.projectId = data.id;
            setProjectLocationData(copyProjectLocationData);
            createProjectLocation(projectLocationData);

            const copyUserProjectData = { ...userProjectsData };
            copyUserProjectData.projectId = data.id;
            setUserProjectsData(copyUserProjectData);
            createUserProjects(userProjectsData).then(
                navigate(`/project/${data.id}/edit`, {
                    state: { locationId },
                })
            );
        });
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
