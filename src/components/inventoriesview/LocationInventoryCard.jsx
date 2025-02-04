import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { InventoryItemList } from "./ItemList";

export const LocationInventoryCard = ({ locationObject, currentUser }) => {
    return (
        <Card m="4">
            <Flex direction="column">
                <Text weight="bold">
                    <Link to={`/location/${locationObject.id}`}>
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
            <InventoryItemList
                locationId={locationObject.id}
                currentUser={currentUser}
            />
        </Card>
    );
};
