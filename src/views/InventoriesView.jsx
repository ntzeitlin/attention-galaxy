import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../services/locationService";
import { Container, Heading, Section } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { createNewItem, createNewTaskItem } from "../services/inventoryService";
import { LocationInventoryList } from "../components/inventoriesview/LocationInventoryList";

export const InventoryListView = ({ currentUser }) => {
    const [locationArray, setLocationArray] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setLocationArray(data)
        );
    }, [currentUser]);

    const handleNewLocationItem = (locationId) => {
        // create new item for database
        const newItemObject = {
            name: "Default New Item",
            description: "",
            quantity: 0,
            isObject: false,
            resourceLink: null,
            locationId: locationId,
            userId: currentUser.id,
        };

        createNewItem(newItemObject).then((data) => {
            createNewTaskItem({
                taskId: 0,
                itemId: data.id,
            });
            navigate(`/item/${data.id}/edit`);
        });
    };

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
