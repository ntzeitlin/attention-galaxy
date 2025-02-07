import { Button, Card, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { InventoryItemList } from "./ItemList";

export const LocationInventoryCard = ({ locationObject, currentUser }) => {
    return (
        <Card>
            <Flex direction="column">
                <Text weight="bold">
                    <Link to={`/location/${locationObject.id}`}>
                        {locationObject.name}
                    </Link>
                </Text>
            </Flex>
            <ScrollArea
                type="always"
                scrollbars="vertical"
                style={{ height: 400 }}
            >
                <InventoryItemList
                    locationId={locationObject.id}
                    currentUser={currentUser}
                />
            </ScrollArea>
        </Card>
    );
};
