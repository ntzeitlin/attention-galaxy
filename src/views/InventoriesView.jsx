import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../services/locationService";
import {
    Box,
    Container,
    Flex,
    Heading,
    Section,
    Spinner,
} from "@radix-ui/themes";
import { LocationInventoryList } from "../components/inventoriesview/LocationInventoryList";

export const InventoryListView = ({ currentUser }) => {
    const [locationArray, setLocationArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) => {
            setLocationArray(data);
            setLoading(false);
        });
    }, [currentUser]);

    return (
        <Container>
            <Heading align="center" mt="8" mb="-5">
                Location Inventories
            </Heading>
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
                    <LocationInventoryList
                        currentUser={currentUser}
                        locationArray={locationArray}
                    />
                )}
            </Section>
        </Container>
    );
};
