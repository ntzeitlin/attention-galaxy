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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectInfoByProjectId } from "../../services/projectService";
import { getLocationInfoByProjectId } from "../../services/locationService";
import { ProjectOverviewCard } from "../card/projectdetailview/ProjectOverview";
import { TaskListCard } from "../card/projectdetailview/TaskListCard";

export const ProjectDetail = ({ currentUser }) => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState({
        name: "",
        startdate: "",
        enddate: "",
        ageSinceTouch: 0,
    });
    const [locationData, setLocationData] = useState({
        name: "",
        address: "",
        description: "",
        gpsrecords: "",
        userId: currentUser.id,
    });

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

    // FOR JANUARY 29:
    /*
    - START TASK GENERATION FOR PROJECT
    - NEW CARD IN THIS VIEW WITH TASKS LISTED OUT FOR THE CURRENT PROJECT
    - ADD TASK BUTTON AND FUNCTIONALITY
    - CLICK ON TASK INFO
    */

    return (
        <Container>
            <Heading align="center" mt="4">
                Project Details
            </Heading>
            <Flex direction="row" justify="between">
                <ProjectOverviewCard
                    currentUser={currentUser}
                    locationData={locationData}
                    projectData={projectData}
                />

                <TaskListCard
                    projectId={projectId}
                    locationData={locationData}
                />
                <Card m="4">INVENTORY</Card>
            </Flex>
        </Container>
    );
};
