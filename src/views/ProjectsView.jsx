import { Container, Heading, Section } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../services/locationService";
import { useNavigate } from "react-router-dom";
import {
    createNewProject,
    createProjectLocation,
    createUserProjects,
} from "../services/projectService";
import { ProjectLocationList } from "../components/projectsview/ProjectLocationList";

export const ProjectListView = ({ currentUser }) => {
    const navigate = useNavigate();

    const [locationArray, setLocationArray] = useState([]);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setLocationArray(data)
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
            <Heading align="center" mt="8" mb="-5">
                Location Projects
            </Heading>
            <Section>
                <ProjectLocationList
                    locationArray={locationArray}
                    handleNewProject={handleNewProject}
                />
            </Section>
        </Container>
    );
};
