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
import { getProjectInfoByProjectId } from "../../services/projectService";

export const ProjectDetail = ({ currentUser }) => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { state } = useLocation();
    const [projectData, setProjectData] = useState({});
    const [locationId, setLocationId] = useState("");

    useEffect(() => {
        getProjectInfoByProjectId(projectId).then((data) =>
            setProjectData(data)
        );
    }, [currentUser]);

    useEffect(() => {
        setLocationId(state.locationId);
    }, [state]);

    //WILL HAVE A TASK SECTION

    return (
        <Card>
            <Heading align="center" mt="4">
                Project Details
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
                                        locationId: locationId,
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
