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
            <Heading align="center" mt="4">
                Location Details
            </Heading>
            <Section>
                <Flex direction="column">
                    <TextField.Root
                        m="2"
                        size="2"
                        value={locationData.name}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={locationData.address}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={locationData.gpscoords}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextArea m="2" value={locationData.description} disabled />
                    {currentUser.id === locationData.userId ? (
                        <Button
                            m="2"
                            color="grass"
                            onClick={() => {
                                navigate(`edit`);
                            }}
                        >
                            Edit Location
                        </Button>
                    ) : (
                        ""
                    )}
                </Flex>
            </Section>
        </Card>
    );
};
