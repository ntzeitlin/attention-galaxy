import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    createProjectLocation,
    createUserProjects,
    getProjectInfoByProjectId,
    updateProjectByProjectId,
} from "../../services/projectService";
import {
    Button,
    Card,
    Container,
    Flex,
    Heading,
    Section,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import {
    getLocationByLocationId,
    getLocationInfoByProjectId,
} from "../../services/locationService";

export const NewProject = ({ currentUser }) => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [locationData, setLocationData] = useState({});
    const [locationName, setLocationName] = useState("");

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
    }, []);

    // why is this not running?
    useEffect(() => {
        getLocationInfoByProjectId(projectData.id).then((data) =>
            setLocationData(data[0])
        );
    }, [projectId]);

    // getLocationInfoByProjectId(projectId).then((data) =>
    //     // setLocationData(data[0])
    //     console.log(data)
    // );

    // useEffect(() => {
    //     getLocationByLocationId(locationData.locationId).then((data) =>
    //         setLocationName(data.name)
    //     );
    // }, [locationData]);

    useEffect(() => {
        const copyProjectLocationData = { ...projectLocationData };
        // LOCATION ID IS NOT PROPERLY GETTING PASSED IN
        copyProjectLocationData.locationId = parseInt(state.locationId);
        copyProjectLocationData.projectId = parseInt(projectId);
        setProjectLocationData(copyProjectLocationData);
    }, [projectId]);

    useEffect(() => {
        const copyUserProjectData = { ...userProjectsData };
        copyUserProjectData.projectId = parseInt(projectId);
        copyUserProjectData.userId = parseInt(currentUser.id);
        setUserProjectsData(copyUserProjectData);
    }, [currentUser, projectId]);

    const handleSaveProject = () => {
        // update project info
        updateProjectByProjectId(projectId, projectData);

        // see if I am editing or starting a new project...
        if (state?.edit !== true) {
            // create new projectlocatio
            createProjectLocation(projectLocationData);

            // create new userprojects
            createUserProjects(userProjectsData);
        }

        navigate(`/project/${projectId}`);
    };

    return (
        <Container width="60%" m="5">
            <Card>
                <Heading align="center" mt="4">
                    Edit Project
                </Heading>
                <Heading size="4" align="center" mt="2" mb="-3">
                    {locationName ? locationName : ""}
                </Heading>

                <Section>
                    <Flex direction="column">
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
                                window.alert("BUILD DELET");
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
