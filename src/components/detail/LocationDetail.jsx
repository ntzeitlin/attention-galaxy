import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    Section,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
    getLocationByLocationId,
    getProjectsByLocationId,
} from "../../services/locationService";
import { useParams } from "react-router-dom";
import { LocationInfoCard } from "../card/LocationInfo";

export const LocationDetail = ({ currentUser }) => {
    const { locationId } = useParams();
    const [locationData, setLocationData] = useState({
        id: "",
        name: "",
        address: "",
        description: "",
        gpscoords: "",
        userId: "",
    });

    const [locationProjects, setLocationProjects] = useState([]);

    useEffect(() => {
        getLocationByLocationId(locationId).then((data) =>
            setLocationData(data)
        );
    }, []);

    useEffect(() => {
        getProjectsByLocationId(locationId).then((data) =>
            setLocationProjects(data)
        );
    }, [locationId]);

    return (
        <Container width="60%" m="5">
            <Flex gap="4" justify="center">
                <LocationInfoCard
                    currentUser={currentUser}
                    locationData={locationData}
                />
                <Card>
                    <Heading align="center" mt="4">
                        Projects
                        <Button size="1" mt="1" ml="3">
                            Add Project
                        </Button>
                    </Heading>

                    <Section>
                        <Flex direction="column">
                            {locationProjects.map((projectObject) => {
                                return (
                                    <Card
                                        m="2"
                                        key={`location-project-${projectObject.project?.id}`}
                                    >
                                        {projectObject.project?.name}
                                    </Card>
                                );
                            })}
                        </Flex>
                    </Section>
                </Card>
            </Flex>
        </Container>
    );
};
