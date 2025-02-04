import { Flex, Section, Separator, Text } from "@radix-ui/themes";

export const Footer = () => {
    return (
        <Section>
            <Separator size="4" mb="4" />
            <Flex justify="center">
                <Text align="center">Attention Galaxy</Text>
            </Flex>
        </Section>
    );
};
