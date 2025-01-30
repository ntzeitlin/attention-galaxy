/* eslint-disable react/prop-types */
import { Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectInfoByProjectId } from "../../services/projectService";
import { getLocationInfoByProjectId } from "../../services/locationService";
import { ProjectOverviewCard } from "../card/projectdetailview/ProjectOverview";
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
        getProjectInfoByProjectId(projectId).then((data) =>
            setProjectData(data)
        );
    }, [currentUser]);

    useEffect(() => {
        getLocationInfoByProjectId(projectId).then((data) =>
            setLocationData(data[0])
        );
    }, [projectId]);

    return (
        <Container width="80%" m="5">
            {/* <Heading align="center">Project Details</Heading> */}
            <Flex gap="3" justify="center">
                <ProjectOverviewCard
                    currentUser={currentUser}
                    locationData={locationData}
                    projectData={projectData}
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
