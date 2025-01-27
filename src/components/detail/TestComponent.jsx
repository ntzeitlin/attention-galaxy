import { Button, Card, Container, Section } from "@radix-ui/themes";

export const TestComponent = () => {
    return (
        <>
            <Container>
                <Section>
                    <Card size="2">
                        <>Test Component</>
                        <Button>test button</Button>
                    </Card>
                </Section>
            </Container>
        </>
    );
};
