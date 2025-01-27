// check to see who the current user is
// find locations related to that current user
// list them out as cards

import { useState } from "react";
import { useEffect } from "react";
import { getLocationsByUserId } from "../../services/locationService";
import { Card, Container, Flex, Section, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const LocationList = ({ currentUser }) => {
    const [locationArray, setLocationArray] = useState([]);

    useEffect(() => {
        fetchAndSetLocations(currentUser.id);
    }, [currentUser]);

    const fetchAndSetLocations = (userId) => {
        getLocationsByUserId(userId).then((data) => setLocationArray(data));
    };

    return (
        <Container>
            <Section>
                <Flex direction="row" gap="4" wrap="wrap">
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
                </Flex>
            </Section>
        </Container>
    );
};
