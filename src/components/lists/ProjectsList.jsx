import {
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Section,
    Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../../services/locationService";
import { Link } from "react-router-dom";
import { ProjectNameCard } from "../card/ProjectName";

export const ProjectList = ({ currentUser }) => {
    const [locationArray, setLocationArray] = useState([]);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setLocationArray(data)
        );
    }, [currentUser]);

    return (
        <Container>
            <Section>
                <Grid columns="3" gap="2">
                    {locationArray.map((locationObject) => {
                        return (
                            <Card
                                m="4"
                                key={`location-card2-${locationObject.id}`}
                            >
                                <Flex direction="column">
                                    <Text weight="bold">
                                        <Link
                                            to={`/location/${locationObject.id}`}
                                        >
                                            {locationObject.name}
                                        </Link>
                                    </Text>
                                    <Button m="2" size="1" color="green">
                                        Add Project
                                    </Button>
                                </Flex>
                                <ProjectNameCard
                                    locationId={locationObject.id}
                                />
                            </Card>
                        );
                    })}
                </Grid>
            </Section>
        </Container>
    );
};
