import { Button, Card, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProjectByProjectId } from "../../../services/projectService";

export const ProjectDetailCard = ({ projectData, currentUser }) => {
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
                    Project Details
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
                    <Heading size="5">{projectData.name}</Heading>
                    <Text as="span" size="2">
                        Start: {projectData.startdate}
                    </Text>
                    <Text as="span" size="2">
                        End: {projectData.enddate}
                    </Text>
                    <Text size="3">Description: {projectData.description}</Text>
                </Flex>
            </Section>
        </Card>
    );
};
