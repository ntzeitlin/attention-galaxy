import { Flex, Section, Text } from "@radix-ui/themes";

export const Footer = () => {
    return (
        <Section style={{ backgroundColor: "lightgray" }}>
            <Flex justify="center">
                <Text align="center">Attention Galaxy</Text>
            </Flex>
        </Section>
    );
};
