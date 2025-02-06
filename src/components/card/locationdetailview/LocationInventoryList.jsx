import { Card, Flex, Heading, Section } from "@radix-ui/themes";
import { InventoryItemList } from "../../inventoriesview/ItemList";
export const LocationInventoryListCard = ({ currentUser, locationData }) => {
    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    Inventory
                </Heading>
            </Flex>
            <Section>
                <InventoryItemList
                    locationId={locationData.id}
                    currentUser={currentUser}
                />
            </Section>
        </Card>
    );
};
