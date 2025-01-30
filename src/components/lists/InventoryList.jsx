import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../../services/locationService";
import {
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
import { ItemList } from "../card/inventory/ItemList";
import {
    createNewItem,
    createNewTaskItem,
} from "../../services/inventoryService";

export const InventoryList = ({ currentUser }) => {
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
                Inventory
            </Heading>
            <Section>
                <Grid columns="3" gap="2">
                    {locationArray.map((locationObject) => {
                        return (
                            <Card
                                m="4"
                                key={`location-card2-${locationObject.id}`}
                            >
                                <Flex direction="column">
                                    <Text weight="bold">
                                        <Link
                                            to={`/location/${locationObject.id}`}
                                        >
                                            {locationObject.name}
                                        </Link>
                                    </Text>
                                    <Button
                                        m="2"
                                        size="1"
                                        color="purple"
                                        onClick={() => {
                                            window.alert("Work on Add Item");
                                        }}
                                    >
                                        Add Item
                                    </Button>
                                </Flex>
                                <ItemList
                                    locationId={locationObject.id}
                                    currentUser={currentUser}
                                />
                            </Card>
                        );
                    })}
                </Grid>
            </Section>
        </Container>
    );
};
