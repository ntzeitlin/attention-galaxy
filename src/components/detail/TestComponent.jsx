import { Button, Card, Container, Section } from "@radix-ui/themes";
import { Header } from "@radix-ui/themes/components/table";

export const TestComponent = () => {
    return (
        <>
            <Container>
                <Section>
                    <Card size="2">
                        <Header>Test Component</Header>
                        <Button>test button</Button>
                    </Card>
                </Section>
            </Container>
        </>
    );
};
