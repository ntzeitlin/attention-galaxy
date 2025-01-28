import {
    Button,
    Card,
    Flex,
    Heading,
    Section,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    getProjectInfoByLocationId,
    getProjectInfoByProjectId,
} from "../../services/projectService";
import { getLocationInfoByProjectId } from "../../services/locationService";

export const ProjectDetail = ({ currentUser }) => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState({});
    const [locationData, setLocationData] = useState("");

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

    //WILL HAVE A TASK SECTION

    return (
        <Card>
            <Heading align="center" mt="4">
                Project Details
            </Heading>
            <Heading size="4" align="center" mt="2" mb="-3">
                {locationData.location?.name}{" "}
            </Heading>

            <Section>
                <Flex direction="column">
                    <TextField.Root
                        m="2"
                        size="2"
                        value={projectData.name}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={projectData.startdate}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={projectData.enddate}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextArea m="2" value={projectData.description} disabled />
                    {currentUser.id ? (
                        <Button
                            m="2"
                            color="grass"
                            onClick={() => {
                                navigate(`edit`, {
                                    state: {
                                        edit: true,
                                    },
                                });
                            }}
                        >
                            Edit Project
                        </Button>
                    ) : (
                        ""
                    )}
                </Flex>
            </Section>
        </Card>
    );
};
