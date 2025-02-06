/* eslint-disable react/prop-types */
import { Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectInfoByProjectId } from "../../services/projectService";
import { getLocationInfoByProjectId } from "../../services/locationService";
import { ProjectDetailCard } from "../card/projectdetailview/ProjectDetailCard";
import { TaskListCard } from "../card/projectdetailview/TaskListCard";
import { MiseEnPlaceListCard } from "../card/tasks/MiseEnPlaceList";

export const ProjectDetail = ({ currentUser }) => {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState({
        name: "",
        startdate: "",
        enddate: "",
        ageSinceTouch: 0,
    });
    const [locationData, setLocationData] = useState({
        name: "",
        address: "",
        description: "",
        gpsrecords: "",
        userId: currentUser.id,
    });

    useEffect(() => {
        fetchAndSetProjectData();
    }, [currentUser]);

    useEffect(() => {
        getLocationInfoByProjectId(projectId).then((data) =>
            setLocationData(data[0])
        );
    }, [projectId]);

    const fetchAndSetProjectData = () => {
        getProjectInfoByProjectId(projectId).then((data) =>
            setProjectData(data)
        );
    };

    return (
        <Container width="90%" m="5">
            <Flex gap="4" justify="center">
                <ProjectDetailCard
                    currentUser={currentUser}
                    locationData={locationData}
                    projectData={projectData}
                    fetchAndSetProjectData={fetchAndSetProjectData}
                />
                <TaskListCard
                    projectId={projectId}
                    locationData={locationData}
                    currentUser={currentUser}
                />
                <MiseEnPlaceListCard
                    currentUser={currentUser}
                    projectId={projectId}
                />
            </Flex>
        </Container>
    );
};
