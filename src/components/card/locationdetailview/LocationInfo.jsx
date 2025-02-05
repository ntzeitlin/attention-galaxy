/* 
Purpose:
Generate a location info card with an edit button for the location details view. 

Process:
Receive locationData and currentUser data. Use the data to generate the card
while hiding the Edit button behind a location owner check. 
*/

import {
    Button,
    Card,
    Flex,
    Heading,
    Section,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export const LocationInfoCard = ({ locationData, currentUser }) => {
    const navigate = useNavigate();

    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    Location
                </Heading>
                {currentUser.id === locationData.userId ? (
                    <Button
                        m="1"
                        ml="2"
                        size="1"
                        onClick={() => {
                            navigate(`edit`);
                        }}
                    >
                        Edit
                    </Button>
                ) : (
                    ""
                )}
            </Flex>
            <Section mt="-6">
                <Flex direction="column">
                    <Heading>{locationData.name}</Heading>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={locationData.address || "loading..."}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={locationData.gpscoords || "loading..."}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextArea
                        m="2"
                        value={locationData.description || "loading..."}
                        disabled
                    />
                </Flex>
            </Section>
        </Card>
    );
};
