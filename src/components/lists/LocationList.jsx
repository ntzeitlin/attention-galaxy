// check to see who the current user is
// find locations related to that current user
// list them out as cards

import { useState } from "react";
import { useEffect } from "react";
import {
    createNewLocationByUserId,
    getLocationsByUserId,
} from "../../services/locationService";
import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Heading,
    Section,
    Text,
} from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";

export const LocationList = ({ currentUser }) => {
    const [locationArray, setLocationArray] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetLocations(currentUser.id);
    }, [currentUser]);

    const fetchAndSetLocations = (userId) => {
        getLocationsByUserId(userId).then((data) => setLocationArray(data));
    };

    const handleAddLocation = () => {
        createNewLocationByUserId(currentUser.id).then((data) =>
            navigate(`/location/${data.id}/edit`)
        );
    };

    return (
        <Container>
            <Heading align="center" mt="8" mb="-5">
                Locations
            </Heading>
            <Box align="center">
                <Button
                    size="1"
                    mt="7"
                    mb="-6"
                    onClick={() => {
                        handleAddLocation();
                    }}
                >
                    Add Location
                </Button>
            </Box>
            <Section>
                <Grid columns="3" gap="4">
                    {locationArray.map((locationObject) => {
                        return (
                            <Card key={`location-card-${locationObject.id}`}>
                                <Flex direction="column">
                                    <Text weight="bold">
                                        <Link
                                            to={`/location/${locationObject.id}`}
                                        >
                                            {locationObject.name}
                                        </Link>
                                    </Text>
                                    <Text>{locationObject.description}</Text>
                                    <Text size="2">
                                        {locationObject.address}
                                    </Text>
                                </Flex>
                            </Card>
                        );
                    })}
                </Grid>
            </Section>
        </Container>
    );
};
