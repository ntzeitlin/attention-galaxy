/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Section,
    Strong,
    Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteUserProjectByUserProjectId,
    getUserProjectByProjectId,
} from "../../../services/projectService";
import { ProjectCheckIn } from "./ProjectCheckIn";
import { getUserProjectsAndUserInfoByProjectId } from "../../../services/userService";
import {
    CrossCircledIcon,
    PersonIcon,
    StarFilledIcon,
} from "@radix-ui/react-icons";

export const ProjectDetailCard = ({
    projectData,
    currentUser,
    locationData,
    fetchAndSetProjectData,
}) => {
    const [userProjectData, setUserProjectData] = useState({});

    useEffect(() => {
        fetchAndSetUserProjectData();
    }, [projectData]);

    const fetchAndSetUserProjectData = () => {
        getUserProjectByProjectId(projectData.id).then((data) =>
            setUserProjectData(data[0])
        );
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
                        <ProjectCheckIn
                            projectData={projectData}
                            fetchAndSetProjectData={fetchAndSetProjectData}
                        />
                        <EditProjectButton />
                    </>
                ) : (
                    ""
                )}
            </Flex>
            <Section mt="-6">
                <ProjectInformation
                    locationData={locationData}
                    projectData={projectData}
                    fetchAndSetProjectData={fetchAndSetProjectData}
                />
            </Section>
        </Card>
    );
};

const EditProjectButton = () => {
    const navigate = useNavigate();

    return (
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
    );
};

const ProjectInformation = ({
    locationData,
    projectData,
    fetchAndSetProjectData,
}) => {
    const [projectUsers, setProjectUsers] = useState();

    useEffect(() => {
        if (projectData.id) {
            getUserProjectsAndUserInfoByProjectId(projectData?.id).then(
                (data) => setProjectUsers(data)
            );
        }
    }, [projectData]);

    return (
        <Flex direction="column">
            <Heading size="5">
                Location:{" "}
                <Link to={`/location/${locationData.location?.id}`}>
                    {locationData.location?.name}
                </Link>
            </Heading>
            <Text as="label" mt="3">
                <Strong>Project Users:</Strong>
            </Text>
            <Flex direction="column" gap="2">
                {projectUsers?.map((userObject) => {
                    return (
                        <ProjectUserCard
                            key={userObject.id}
                            userObject={userObject}
                            fetchAndSetProjectData={fetchAndSetProjectData}
                        />
                    );
                })}
            </Flex>
            <Text as="span" size="2" mt="3">
                Start: {projectData.startdate}
            </Text>
            <Text as="span" size="2">
                End: {projectData.enddate}
            </Text>
            <Box maxWidth="20em" mt="1em">
                <Text size="3" wrap="wrap">
                    <Strong>Description:</Strong> {projectData.description}
                </Text>
            </Box>
        </Flex>
    );
};

const ProjectUserCard = ({ userObject, fetchAndSetProjectData }) => {
    return (
        <Card>
            <Flex justify="between">
                <Text>
                    {userObject.isOwner ? "" : ""}
                    <PersonIcon />{" "}
                    {userObject.user?.userName || userObject.user?.email}
                </Text>
                {typeof userObject.id !== "undefined" && !userObject.isOwner ? (
                    <Button
                        size="1"
                        color="red"
                        onClick={() => {
                            deleteUserProjectByUserProjectId(
                                userObject.id
                            ).then(() => {
                                fetchAndSetProjectData();
                            });
                        }}
                    >
                        <CrossCircledIcon />
                    </Button>
                ) : (
                    <Box mr="2">
                        <StarFilledIcon />
                    </Box>
                )}
            </Flex>
        </Card>
    );
};
