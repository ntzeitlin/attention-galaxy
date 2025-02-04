// check to see who the current user is
// find locations related to that current user
// list them out as cards

import { useState } from "react";
import { useEffect } from "react";
import { getLocationsByUserId } from "../../services/locationService";
import {
    Button,
    Card,
    Container,
    Flex,
    Grid,
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

    return (
        <Container>
            <Button
                mt="5"
                mb="-6"
                onClick={() => {
                    navigate("/locations/new");
                }}
            >
                Add Location
            </Button>
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
