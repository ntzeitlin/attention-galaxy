import { Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectInfoByProjectId } from "../../services/projectService";
import { getLocationInfoByProjectId } from "../../services/locationService";
import { ProjectOverviewCard } from "../card/projectdetailview/ProjectOverview";
import { TaskListCard } from "../card/projectdetailview/TaskListCard";

export const ProjectDetail = ({ currentUser }) => {
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
        <Container width="80%" m="5">
            {/* <Heading align="center">Project Details</Heading> */}
            <Flex gap="3" justify="center">
                <ProjectOverviewCard
                    currentUser={currentUser}
                    locationData={locationData}
                    projectData={projectData}
                />
                <TaskListCard
                    projectId={projectId}
                    locationData={locationData}
                />
                <Card>
                    <Flex direction="column">
                        <Heading align="center" mt="4">
                            Mise en Place
                        </Heading>
                        <Button
                            size="1"
                            mt="1"
                            color="green"
                            onClick={() => {}}
                        >
                            Add Item
                        </Button>
                    </Flex>
                </Card>
            </Flex>
        </Container>
    );
};
