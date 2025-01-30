// check to see who the current user is
// find locations related to that current user
// list them out as cards

import { useState } from "react";
import { useEffect } from "react";
import {
    createNewLocationByUserId,
    getLocationsByUserId,
} from "../services/locationService";
import { Box, Button, Container, Heading, Section } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { LocationList } from "../components/lists/LocationList";

export const LocationListView = ({ currentUser }) => {
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
                <LocationList locationArray={locationArray} />
            </Section>
        </Container>
    );
};
