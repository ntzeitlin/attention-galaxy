import {
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
import { ProjectListCard } from "../card/ProjectListCard";

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
                <ProjectListCard
                    locationProjects={locationProjects}
                    currentUser={currentUser}
                    locationData={locationData}
                />
                <Card>
                    <Flex direction="column">
                        <Heading align="center" mt="4">
                            Inventory
                        </Heading>
                        {currentUser.id === locationData.userId ? (
                            <Button size="1" mt="1" ml="3" onClick={() => {}}>
                                Add Inventory
                            </Button>
                        ) : (
                            ""
                        )}
                    </Flex>
                    <Section>
                        <Flex direction="column">
                            <Card m="2">Placeholder Item Name...</Card>
                            <Card m="2">Inventory Item Name...</Card>
                            <Card m="2">Inventory Item Name...</Card>
                            <Card m="2">Inventory Item Name...</Card>
                        </Flex>
                    </Section>
                </Card>
            </Flex>
        </Container>
    );
};
