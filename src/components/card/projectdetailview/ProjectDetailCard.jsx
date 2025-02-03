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

export const ProjectDetailCard = ({
    projectData,
    currentUser,
    locationData,
}) => {
    const navigate = useNavigate();
    const [userProjectData, setUserProjectData] = useState({});

    useEffect(() => {
        getUserProjectByProjectId(projectData.id).then((data) =>
            setUserProjectData(data[0])
        );
    }, [projectData]);

    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    {projectData.name} Details
                </Heading>
                {currentUser.id === userProjectData?.userId &&
                userProjectData.isOwner ? (
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
                    <Box maxWidth="20em">
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
