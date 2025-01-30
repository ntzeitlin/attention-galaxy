import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";

export const LocationInventoryListCard = ({ currentUser, locationData }) => {
    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    Inventory
                </Heading>
                {currentUser.id === locationData.userId ? (
                    <Button size="1" mt="1" ml="3" onClick={() => {}}>
                        Add Inventory
                    </Button>
                ) : (
                    ""
                )}
            </Flex>
            <Section>
                <Flex direction="column">
                    <Card m="2">Placeholder Item Name...</Card>
                    <Card m="2">Inventory Item Name...</Card>
                    <Card m="2">Inventory Item Name...</Card>
                    <Card m="2">Inventory Item Name...</Card>
                </Flex>
            </Section>
        </Card>
    );
};
