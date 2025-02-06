import { Grid } from "@radix-ui/themes";
import { LocationInventoryCard } from "./LocationInventoryCard";

export const LocationInventoryList = ({ currentUser, locationArray }) => {
    return (
        <Grid columns="3" gap="4">
            {locationArray.map((locationObject) => {
                return (
                    <LocationInventoryCard
                        key={`location-inventory-card-${locationObject.id}`}
                        currentUser={currentUser}
                        locationObject={locationObject}
                    />
                );
            })}
        </Grid>
    );
};
