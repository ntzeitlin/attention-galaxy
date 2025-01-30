import { Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { ProjectNameList } from "./ProjectNameList";

export const ProjectLocationList = ({ locationArray, handleNewProject }) => {
    return (
        <Grid columns="3" gap="2">
            {locationArray.map((locationObject) => {
                return (
                    <Card m="4" key={`location-card2-${locationObject.id}`}>
                        <Flex direction="column">
                            <Text weight="bold">
                                <Link to={`/location/${locationObject.id}`}>
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
                        <ProjectNameList locationId={locationObject.id} />
                    </Card>
                );
            })}
        </Grid>
    );
};
