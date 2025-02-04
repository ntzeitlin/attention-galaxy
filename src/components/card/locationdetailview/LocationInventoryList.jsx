import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { InventoryItemList } from "../../inventoriesview/ItemList";
export const LocationInventoryListCard = ({ currentUser, locationData }) => {
    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    Inventory
                </Heading>
                {/* {currentUser.id === locationData.userId ? (
                    <Button
                        size="1"
                        mt="1"
                        ml="3"
                        onClick={() => {
                            window.alert(
                                "You'd think that would do something, right?"
                            );
                        }}
                    >
                        Add Inventory
                    </Button>
                ) : (
                    ""
                )} */}
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
