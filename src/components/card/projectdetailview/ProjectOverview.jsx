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

export const ProjectOverviewCard = ({
    locationData,
    projectData,
    currentUser,
}) => {
    const navigate = useNavigate();

    return (
        <Card m="4">
            <Section>
                <Heading size="4" align="center" mt="-7" mb="3">
                    Location: {locationData.location?.name}{" "}
                </Heading>
                <Flex direction="column">
                    <TextField.Root
                        m="2"
                        size="2"
                        value={projectData.name}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={projectData.startdate}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextField.Root
                        m="2"
                        size="2"
                        value={projectData.enddate}
                        disabled
                    >
                        <TextField.Slot></TextField.Slot>
                    </TextField.Root>
                    <TextArea m="2" value={projectData.description} disabled />
                    {currentUser.id ? (
                        <Button
                            m="2"
                            color="grass"
                            onClick={() => {
                                navigate(`edit`, {
                                    state: {
                                        edit: true,
                                    },
                                });
                            }}
                        >
                            Edit Project
                        </Button>
                    ) : (
                        ""
                    )}
                </Flex>
            </Section>
        </Card>
    );
};
