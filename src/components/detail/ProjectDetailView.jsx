/* eslint-disable react/prop-types */
import {
    Container,
    Flex,
    Section,
    Box,
    Heading,
    Spinner,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectInfoByProjectId } from "../../services/projectService";
import { getLocationInfoByProjectId } from "../../services/locationService";
import { ProjectDetailCard } from "../card/projectdetailview/ProjectDetailCard";
import { TaskListCard } from "../card/projectdetailview/TaskListCard";
import { MiseEnPlaceListCard } from "../card/tasks/MiseEnPlaceList";

export const ProjectDetail = ({ currentUser }) => {
    const { projectId } = useParams();

    const [loading, setLoading] = useState(true);

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
        getLocationInfoByProjectId(projectId).then((data) => {
            setLocationData(data[0]);
            setLoading(false);
        });
    }, [projectId]);

    const fetchAndSetProjectData = () => {
        getProjectInfoByProjectId(projectId).then((data) =>
            setProjectData(data)
        );
    };

    return (
        <Container width="90%" m="5">
            {loading ? (
                <Section mt="9">
                    <Flex align="center" justify="center">
                        <Box mr="3">
                            <Spinner size="3" />
                        </Box>
                        <Heading size="8">Loading...</Heading>
                    </Flex>
                </Section>
            ) : (
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
            )}
        </Container>
    );
};
