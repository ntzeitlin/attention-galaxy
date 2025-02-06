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
    AlertDialog,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    Section,
    Select,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { getLocationsByUserId } from "../../services/locationService";
import {
    deleteTaskByTaskId,
    getTasksAndTaskItemsByProjectId,
} from "../../services/taskService";
import { deleteItemByItemId } from "../../services/inventoryService";
import { ShareProjectButton } from "./ShareProjectButton";

export const NewProject = ({ currentUser }) => {
    const { projectId } = useParams();
    const { state } = useLocation();

    const [userLocationsArray, setUserLocationsArray] = useState([]);
    const [currentProjectLocation, setCurrentProjectLocation] = useState(
        state?.locationId
    );

    const [projectData, setProjectData] = useState({
        id: "",
        name: "",
        startdate: "",
        enddate: "",
        ageSinceTouch: 0,
        description: "",
        planetColor: "#87CEFA",
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
        fetchAndSetData();
    }, [projectId]);

    const fetchAndSetData = () => {
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
    };

    useEffect(() => {
        setProjectLocationData((prev) => ({
            ...prev,
            locationId: parseInt(currentProjectLocation),
            projectId: parseInt(projectId),
        }));
    }, [projectId, currentProjectLocation]);

    useEffect(() => {
        setUserProjectsData((prev) => ({
            ...prev,
            projectId: parseInt(projectId),
            userId: parseInt(currentUser.id),
        }));
    }, [currentUser, projectId]);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setUserLocationsArray(data)
        );
    }, [currentUser]);

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
                    <ProjectForm
                        handleSelectLocation={handleSelectLocation}
                        currentProjectLocation={currentProjectLocation}
                        userLocationsArray={userLocationsArray}
                        projectData={projectData}
                        setProjectData={setProjectData}
                        projectId={projectId}
                        currentUser={currentUser}
                        projectLocationData={projectLocationData}
                        userProjectsData={userProjectsData}
                    />
                </Section>
            </Card>
        </Container>
    );
};

const ProjectForm = ({
    handleSelectLocation,
    currentProjectLocation,
    userLocationsArray,
    projectData,
    setProjectData,
    projectId,
    currentUser,
    projectLocationData,
    userProjectsData,
}) => {
    const navigate = useNavigate();

    const handleSaveProject = (event) => {
        event.preventDefault();
        // update project info
        updateProjectByProjectId(projectId, projectData);
        updateProjectLocationById(projectLocationData.id, projectLocationData);
        updateUserProjectsById(userProjectsData.id, userProjectsData);

        navigate(`/project/${projectId}`);
    };

    const handleDeleteProject = () => {
        getTasksAndTaskItemsByProjectId(projectId)
            .then((data) => {
                for (const taskObject of data) {
                    for (const taskItem of taskObject.taskitems) {
                        deleteItemByItemId(taskItem.itemId);
                    }
                    deleteTaskByTaskId(taskObject.id);
                }
            })
            .then(() => {
                deleteProjectByProjectId(projectId).then(
                    navigate(`/location/${currentProjectLocation}`)
                );
            });
    };

    return (
        <Flex direction="column" m="3" mt="-5">
            <Text as="label">Project Location:</Text>
            <Select.Root
                m="2"
                size="2"
                value={currentProjectLocation || ""}
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
                                value={locationObject.id || 0}
                            >
                                {locationObject.name}
                            </Select.Item>
                        );
                    })}
                </Select.Content>
            </Select.Root>

            <Text as="label">Project Name:</Text>

            <TextField.Root
                m="2"
                size="2"
                placeholder="Enter Project Name..."
                value={projectData?.name || ""}
                onChange={(event) => {
                    const projectDataCopy = {
                        ...projectData,
                    };
                    projectDataCopy.name = event.target.value;
                    setProjectData(projectDataCopy);
                }}
            >
                <TextField.Slot></TextField.Slot>
            </TextField.Root>
            <Text as="label">Start Date:</Text>

            <TextField.Root
                m="2"
                size="2"
                placeholder="Enter Start Date..."
                value={projectData?.startdate || ""}
                onChange={(event) => {
                    const projectDataCopy = {
                        ...projectData,
                    };
                    projectDataCopy.startdate = event.target.value;
                    setProjectData(projectDataCopy);
                }}
            >
                <TextField.Slot></TextField.Slot>
            </TextField.Root>
            <Text as="label">End Date:</Text>

            <TextField.Root
                m="2"
                size="2"
                placeholder="Enter End Date..."
                value={projectData?.enddate || ""}
                onChange={(event) => {
                    const projectDataCopy = {
                        ...projectData,
                    };
                    projectDataCopy.enddate = event.target.value;
                    setProjectData(projectDataCopy);
                }}
            >
                <TextField.Slot></TextField.Slot>
            </TextField.Root>
            <Text as="label">Project Description:</Text>

            <TextArea
                m="2"
                placeholder="Project Description..."
                value={projectData?.description || ""}
                onChange={(event) => {
                    const projectDataCopy = {
                        ...projectData,
                    };
                    projectDataCopy.description = event.target.value;
                    setProjectData(projectDataCopy);
                }}
            />
            <Text as="label">Project Color:</Text>
            <TextField.Root
                m="2"
                type="color"
                value={projectData?.planetColor || "#ffffff"}
                onChange={(event) => {
                    const projectDataCopy = {
                        ...projectData,
                    };
                    projectDataCopy.planetColor = event.target.value;
                    setProjectData(projectDataCopy);
                }}
            >
                <TextField.Slot></TextField.Slot>
            </TextField.Root>
            <Text as="label">Share Project:</Text>
            <ShareProjectButton
                projectId={projectId}
                currentUser={currentUser}
            />
            <Text mt="5" as="label">
                Save Project:
            </Text>
            <Button
                type="submit"
                m="2"
                onClick={(event) => {
                    handleSaveProject(event);
                }}
            >
                Save Project
            </Button>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button m="2" color="red">
                        Delete Project
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content size="1" maxWidth="300px">
                    <AlertDialog.Title>Delete Project</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This Project, its tasks and items will be
                        deleted.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                variant="solid"
                                color="red"
                                onClick={() => {
                                    handleDeleteProject();
                                }}
                            >
                                Delete Project
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </Flex>
    );
};
