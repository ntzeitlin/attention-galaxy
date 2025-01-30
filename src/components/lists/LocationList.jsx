import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const LocationList = ({ locationArray }) => {
    return (
        <Grid columns="3" gap="4">
            {locationArray.map((locationObject) => {
                return (
                    <Card key={`location-card-${locationObject.id}`}>
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
            })}
        </Grid>
    );
};
