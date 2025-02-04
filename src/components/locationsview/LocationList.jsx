import { Card, Flex, Grid, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { LocationListCard } from "./LocationListCard";

export const LocationList = ({ locationArray }) => {
    return (
        <Grid columns="3" gap="4">
            {locationArray.map((locationObject) => {
                return (
                    <LocationListCard
                        key={`location-card-${locationObject.id}`}
                        locationObject={locationObject}
                    />
                );
            })}
        </Grid>
    );
};
