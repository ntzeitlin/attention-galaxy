/* eslint-disable react/prop-types */
/*
Purpose: 
Manage a location's projects: 
1) Provide a way to create new projects.
2) Display cards for existing projects.

Process:
Receive the array of locationProjects, locationData and currentUser data from 
LocationDetailView. 

Using locationData and currentUser data to hide the new project button
from non-owners.

Iterate through locationProjects to generate a ProjectNameCard component 
for each project in the location. 

Handle New Project generation by first creating a new project in the database,
then grab the project's id from the returned data, using the projectId to:
1) create a new projectLocation in the database
2) create a new userProject in the database.
3) navigate the user to the edit project detail's page for the new project.

*/

import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";
import {
    createNewProject,
    createProjectLocation,
    createUserProjects,
} from "../../../services/projectService";
import { ProjectNameCard } from "../../projectsview/ProjectNameCard";

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
                            <ProjectNameCard
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
