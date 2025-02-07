/*
Component Purpose:
List out all locations owned by user as cards.

Process:
check to see who the current user is
fetch locations related to that current user
dynamically generate locations as cards

*/

import { useState } from "react";
import { useEffect } from "react";
import {
    createNewLocationByUserId,
    getLocationsByUserId,
} from "../services/locationService";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Section,
    Spinner,
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { LocationList } from "../components/locationsview/LocationList";

export const LocationListView = ({ currentUser }) => {
    const [locationArray, setLocationArray] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetLocations(currentUser.id);
    }, [currentUser]);

    const fetchAndSetLocations = (userId) => {
        getLocationsByUserId(userId).then((data) => {
            setLocationArray(data);
            setLoading(false);
        });
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
                {loading ? (
                    <Section mt="9">
                        <Flex align="center" justify="center">
                            <Box mr="3">
                                <Spinner size="3" />
                            </Box>
                            <Heading size="8">Loading...</Heading>
                        </Flex>
                    </Section>
                ) : (
                    <LocationList locationArray={locationArray} />
                )}
            </Section>
        </Container>
    );
};
