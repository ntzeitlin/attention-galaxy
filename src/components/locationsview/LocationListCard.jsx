import { Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const LocationListCard = ({ locationObject }) => {
    return (
        <Card>
            <Flex direction="column">
                <Text weight="bold">
                    <Link to={`/location/${locationObject.id}`}>
                        {locationObject.name}
                    </Link>
                </Text>
                <Text>{locationObject.description}</Text>
                <Text size="2">{locationObject.address}</Text>
            </Flex>
        </Card>
    );
};
