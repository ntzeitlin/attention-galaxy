/*
Purpose: 
Return a Location details card, with hover styling, that provides a link
to the location's details page.

Process:
Receive a locationObject from LocationList and dynamically generate 
a new location list card.

*/

import { Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const LocationListCard = ({ locationObject }) => {
    return (
        <Card
            style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                    "0px 10px 20px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            <Link
                to={`/location/${locationObject.id}`}
                style={{ textDecoration: "none" }}
            >
                <Flex direction="column">
                    <Text weight="bold" style={{ textDecoration: "underline" }}>
                        {locationObject.name}
                    </Text>
                    <Text>{locationObject.description}</Text>
                    <Text size="2">{locationObject.address}</Text>
                </Flex>
            </Link>
        </Card>
    );
};
