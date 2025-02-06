/*
Component Purpose:
Create Grid for Location Cards

Process:
Receive user's location array from LocationsView.
Iterate through the array and return 
a LocationListCard component for each location.
*/

import { Grid } from "@radix-ui/themes";
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
