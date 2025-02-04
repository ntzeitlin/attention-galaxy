import {
    Card,
    Container,
    Flex,
    Grid,
    Heading,
    Section,
    Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../services/locationService";
import { Link, useNavigate } from "react-router-dom";
import {
    createNewProject,
    createProjectLocation,
    createUserProjects,
    getSharedUserProjectArrayByUserId,
} from "../services/projectService";
import { ProjectLocationList } from "../components/projectsview/ProjectLocationList";
import { getUserDataByUserId } from "../services/userService";
import { SharedProjectCard } from "../components/projectsview/SharedProjectCard";

export const ProjectListView = ({ currentUser }) => {
    const navigate = useNavigate();

    const [locationArray, setLocationArray] = useState([]);

    const [userProjectsArray, setUserProjectsArray] = useState([]);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setLocationArray(data)
        );

        getSharedUserProjectArrayByUserId(currentUser.id).then((data) =>
            setUserProjectsArray(data)
        );
    }, [currentUser]);

    const handleNewProject = (locationId) => {
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
        <Container>
            <Flex direction="column">
                <Section>
                    <Heading align="center">Location Projects</Heading>
                    <ProjectLocationList
                        locationArray={locationArray}
                        handleNewProject={handleNewProject}
                    />
                </Section>
                {userProjectsArray.length ? (
                    <Section mt="-5">
                        <Heading align="center">Shared Projects</Heading>
                        <Card m="4">
                            <Grid columns="2" gap="4" p="6">
                                {userProjectsArray.map(
                                    (sharedProjectObject) => {
                                        return (
                                            <SharedProjectCard
                                                key={`sharedproject-key-${sharedProjectObject.id}`}
                                                sharedProjectObject={
                                                    sharedProjectObject
                                                }
                                            />
                                        );
                                    }
                                )}
                            </Grid>
                        </Card>
                    </Section>
                ) : (
                    ""
                )}
            </Flex>
        </Container>
    );
};
