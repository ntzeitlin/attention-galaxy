import { Button, Card, Container, Section } from "@radix-ui/themes";

export const TestComponent = ({ currentLocation }) => {
    return (
        <>
            <Container>
                <Section>
                    <Card size="2">
                        <div>
                            Test Component for{" "}
                            <strong>{currentLocation}</strong>
                        </div>
                        <Button>test button</Button>
                    </Card>
                </Section>
            </Container>
        </>
    );
};
