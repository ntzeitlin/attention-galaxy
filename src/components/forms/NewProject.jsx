import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    deleteProjectByProjectId,
    getProjectInfoByProjectId,
    getProjectLocationByProjectId,
    getUserProjectByProjectId,
    updateProjectByProjectId,
    updateProjectLocationById,
    updateUserProjectsById,
} from "../../services/projectService";
import {
    Button,
    Card,
    Container,
    Flex,
    Heading,
    Section,
    Select,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { getLocationsByUserId } from "../../services/locationService";

export const NewProject = ({ currentUser }) => {
    const { projectId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [userLocationsArray, setUserLocationsArray] = useState([]);
    const [currentProjectLocation, setCurrentProjectLocation] = useState(
        state.locationId
    );

    const [projectData, setProjectData] = useState({
        id: "",
        name: "",
        startdate: "",
        enddate: "",
        ageSinceTouch: 0,
        description: "",
    });

    const [projectLocationData, setProjectLocationData] = useState({
        locationId: "",
        projectId: "",
    });

    const [userProjectsData, setUserProjectsData] = useState({
        projectId: "",
        userId: "",
        isOwner: true,
    });

    useEffect(() => {
        getProjectInfoByProjectId(projectId).then((data) =>
            setProjectData(data)
        );

        getProjectLocationByProjectId(projectId).then((data) => {
            setProjectLocationData(data[0]);
            setCurrentProjectLocation(data[0]?.locationId);
        });

        getUserProjectByProjectId(projectId).then((data) =>
            setUserProjectsData(data[0])
        );
    }, [projectId]);

    useEffect(() => {
        const copyProjectLocationData = { ...projectLocationData };
        copyProjectLocationData.locationId = parseInt(currentProjectLocation);
        copyProjectLocationData.projectId = parseInt(projectId);
        setProjectLocationData(copyProjectLocationData);
    }, [projectId, currentProjectLocation]);

    useEffect(() => {
        const copyUserProjectData = { ...userProjectsData };
        copyUserProjectData.projectId = parseInt(projectId);
        copyUserProjectData.userId = parseInt(currentUser.id);
        setUserProjectsData(copyUserProjectData);
    }, [currentUser, projectId]);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setUserLocationsArray(data)
        );
    }, [currentUser]);

    useEffect(() => {}, []);

    const handleSaveProject = () => {
        // update project info
        updateProjectByProjectId(projectId, projectData);
        updateProjectLocationById(projectLocationData.id, projectLocationData);
        updateUserProjectsById(userProjectsData.id, userProjectsData);

        navigate(`/project/${projectId}`);
    };

    const handleDeleteProject = () => {
        deleteProjectByProjectId(projectId).then(
            navigate(`/location/${currentProjectLocation}`)
        );
    };

    const handleSelectLocation = (event) => {
        setCurrentProjectLocation(event);
    };

    return (
        <Container width="60%" m="5">
            <Card>
                <Heading align="center" mt="4">
                    Edit Project
                </Heading>

                <Section>
                    <Flex direction="column">
                        <Select.Root
                            m="2"
                            value={currentProjectLocation}
                            onValueChange={(event) => {
                                handleSelectLocation(event);
                            }}
                        >
                            <Select.Trigger placeholder="Pick a location" />
                            <Select.Content>
                                {userLocationsArray.map((locationObject) => {
                                    return (
                                        <Select.Item
                                            key={`location-item-${locationObject.id}`}
                                            value={locationObject.id}
                                        >
                                            {locationObject.name}
                                        </Select.Item>
                                    );
                                })}
                            </Select.Content>
                        </Select.Root>
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Project Name..."
                            value={projectData.name}
                            onChange={(event) => {
                                const projectDataCopy = { ...projectData };
                                projectDataCopy.name = event.target.value;
                                setProjectData(projectDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Start Date..."
                            value={projectData.startdate}
                            onChange={(event) => {
                                const projectDataCopy = { ...projectData };
                                projectDataCopy.startdate = event.target.value;
                                setProjectData(projectDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter End Date..."
                            value={projectData.enddate}
                            onChange={(event) => {
                                const projectDataCopy = { ...projectData };
                                projectDataCopy.enddate = event.target.value;
                                setProjectData(projectDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <TextArea
                            m="2"
                            placeholder="Project Description..."
                            value={projectData.description}
                            onChange={(event) => {
                                const projectDataCopy = { ...projectData };
                                projectDataCopy.description =
                                    event.target.value;
                                setProjectData(projectDataCopy);
                            }}
                        />
                        <Button
                            m="2"
                            onClick={() => {
                                handleSaveProject();
                            }}
                        >
                            Save Project
                        </Button>
                        <Button
                            m="2"
                            color="red"
                            onClick={() => {
                                handleDeleteProject();
                            }}
                        >
                            Delete Project
                        </Button>
                    </Flex>
                </Section>
            </Card>
        </Container>
    );
};
