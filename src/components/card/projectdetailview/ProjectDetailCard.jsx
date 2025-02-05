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
import { getUserProjectByProjectId } from "../../../services/projectService";
import { ProjectCheckIn } from "./ProjectCheckIn";

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

const ProjectInformation = ({ locationData, projectData }) => {
    return (
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
                    <Strong>Description:</Strong> {projectData.description}
                </Text>
            </Box>
        </Flex>
    );
};
