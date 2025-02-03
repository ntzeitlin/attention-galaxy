import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Heading,
    Section,
    Strong,
    Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getUserProjectByProjectId,
    updateProjectByProjectId,
} from "../../../services/projectService";

export const ProjectDetailCard = ({
    projectData,
    currentUser,
    locationData,
    fetchAndSetProjectData,
}) => {
    const navigate = useNavigate();
    const [userProjectData, setUserProjectData] = useState({});

    useEffect(() => {
        fetchAndSetUserProjectData();
    }, [projectData]);

    useEffect(() => {}, [userProjectData]);

    const loadAge = () => {};

    const fetchAndSetUserProjectData = () => {
        getUserProjectByProjectId(projectData.id).then((data) =>
            setUserProjectData(data[0])
        );
    };

    const handleCheckIn = () => {
        const submissionObject = {
            ...projectData,
            ageSinceTouch: 0,
        };
        updateProjectByProjectId(projectData.id, submissionObject).then(() => {
            fetchAndSetProjectData();
        });
    };

    const handleIgnore = () => {
        const submissionObject = {
            ...projectData,
            ageSinceTouch: projectData.ageSinceTouch + 1,
        };
        updateProjectByProjectId(projectData.id, submissionObject).then(() => {
            fetchAndSetProjectData();
        });
    };

    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    {projectData.name} Details
                </Heading>
                <Heading size="4" my="2">
                    Days Since Checkin: {projectData.ageSinceTouch}
                </Heading>
                {currentUser.id === userProjectData?.userId &&
                userProjectData.isOwner ? (
                    <>
                        <Grid>
                            <Button
                                m="1"
                                onClick={() => {
                                    handleCheckIn();
                                }}
                            >
                                Check-In
                            </Button>
                            <Button
                                color="red"
                                m="1"
                                onClick={() => {
                                    handleIgnore();
                                }}
                            >
                                Ignore
                            </Button>
                        </Grid>
                        <Button
                            m="1"
                            size="1"
                            color="grass"
                            onClick={() => {
                                navigate(`edit`, {
                                    state: {
                                        edit: true,
                                    },
                                });
                            }}
                        >
                            Edit
                        </Button>
                    </>
                ) : (
                    ""
                )}
            </Flex>
            <Section mt="-6">
                <Flex direction="column">
                    <Heading size="5">
                        Location:{" "}
                        <Link to={`/location/${locationData.location?.id}`}>
                            {locationData.location?.name}
                        </Link>
                    </Heading>
                    <Text as="span" size="2">
                        Start: {projectData.startdate}
                    </Text>
                    <Text as="span" size="2">
                        End: {projectData.enddate}
                    </Text>
                    <Box maxWidth="20em" mt="1em">
                        <Text size="3" wrap="wrap">
                            <Strong>Description:</Strong>{" "}
                            {projectData.description}
                        </Text>
                    </Box>
                </Flex>
            </Section>
        </Card>
    );
};
