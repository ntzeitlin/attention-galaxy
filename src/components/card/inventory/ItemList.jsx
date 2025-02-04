import { useEffect, useState } from "react";
import { getInventoryItemsByLocationAndUserId } from "../../../services/inventoryService";
import { ItemNameCard } from "./ItemName";

export const ItemList = ({ locationId, currentUser }) => {
    const [itemArray, setItemArray] = useState([]);

    useEffect(() => {
        getInventoryItemsByLocationAndUserId(locationId, currentUser.id).then(
            (data) => setItemArray(data)
        );
    }, [locationId, currentUser]);

    return itemArray.map((itemObject) => {
        return (
            <ItemNameCard
                key={`inventory-item-${itemObject.id}`}
                itemObject={itemObject}
            />
        );
    });
};
