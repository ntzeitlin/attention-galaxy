import { useEffect, useState } from "react";
import { getInventoryItemsByLocationAndUserId } from "../../services/inventoryService";
import { ItemNameCard } from "./ItemName";
import { Grid } from "@radix-ui/themes";

export const InventoryItemList = ({ locationId, currentUser }) => {
    const [itemArray, setItemArray] = useState([]);

    useEffect(() => {
        getInventoryItemsByLocationAndUserId(locationId, currentUser.id).then(
            (data) => setItemArray(data)
        );
    }, [locationId, currentUser]);

    return (
        <Grid columns="1">
            {itemArray.map((itemObject) => {
                return (
                    <ItemNameCard
                        key={`inventory-item-${itemObject.id}`}
                        itemObject={itemObject}
                    />
                );
            })}
        </Grid>
    );
};
