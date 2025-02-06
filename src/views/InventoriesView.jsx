import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../services/locationService";
import { Container, Heading, Section } from "@radix-ui/themes";
import { LocationInventoryList } from "../components/inventoriesview/LocationInventoryList";

export const InventoryListView = ({ currentUser }) => {
    const [locationArray, setLocationArray] = useState([]);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setLocationArray(data)
        );
    }, [currentUser]);

    return (
        <Container>
            <Heading align="center" mt="8" mb="-5">
                Location Inventories
            </Heading>
            <Section>
                <LocationInventoryList
                    currentUser={currentUser}
                    locationArray={locationArray}
                />
            </Section>
        </Container>
    );
};
