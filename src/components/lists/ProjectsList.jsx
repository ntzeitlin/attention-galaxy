import {
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Heading,
    Section,
    Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getLocationsByUserId } from "../../services/locationService";
import { Link, useNavigate } from "react-router-dom";
import { ProjectNameCard } from "../card/ProjectNameList";
import { createNewProject } from "../../services/projectService";

export const ProjectList = ({ currentUser }) => {
    const navigate = useNavigate();

    const [locationArray, setLocationArray] = useState([]);

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setLocationArray(data)
        );
    }, [currentUser]);

    const handleNewProject = (locationId) => {
        createNewProject().then((data) =>
            navigate(`/project/${data.id}/edit`, { state: { locationId } })
        );
    };

    return (
        <Container>
            <Heading align="center" mt="8" mb="-5">
                Projects
            </Heading>
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
                                    <Button
                                        m="2"
                                        size="1"
                                        color="green"
                                        onClick={() => {
                                            handleNewProject(locationObject.id);
                                        }}
                                    >
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
