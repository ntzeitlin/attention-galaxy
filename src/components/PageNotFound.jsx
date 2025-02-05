import { Box, Container, Flex, Heading, Section } from "@radix-ui/themes";
import SpaceImage from "../assets/images/404spacenotfound.jpg";

export const PageNoteFound = () => {
    return (
        <Container align="center">
            <Section>
                <Flex direction="column" align="center" gap="3">
                    <Heading as="h1" align="center">
                        Page Not Found
                    </Heading>
                    <Box>
                        <img
                            style={{ borderRadius: "2em", maxHeight: "40em" }}
                            src={SpaceImage}
                        />
                    </Box>
                </Flex>
            </Section>
        </Container>
    );
};
