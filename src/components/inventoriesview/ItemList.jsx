import { useEffect, useState } from "react";
import { getInventoryItemsByLocationAndUserId } from "../../services/inventoryService";
import { ItemNameCard } from "./ItemName";
import { Flex, Grid } from "@radix-ui/themes";

export const InventoryItemList = ({ locationId, currentUser }) => {
    const [itemArray, setItemArray] = useState([]);

    useEffect(() => {
        getInventoryItemsByLocationAndUserId(locationId, currentUser.id).then(
            (data) => setItemArray(data)
        );
    }, [locationId, currentUser]);

    return (
        <Grid columns="2">
            {/* <Flex direction="column"> */}
            {itemArray.map((itemObject) => {
                return (
                    <ItemNameCard
                        key={`inventory-item-${itemObject.id}`}
                        itemObject={itemObject}
                    />
                );
            })}
            {/* </Flex> */}
        </Grid>
    );
};

// Next Steps: Account for Unassigned Items...
// Then, work on displaying Location Inventory by Project or Unassigned Items.
// Allow users to add inventory items and default to unassigned.
