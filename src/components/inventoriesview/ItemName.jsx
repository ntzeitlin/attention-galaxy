import { Card, Strong } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getItemTaskInfoByItemId } from "../../services/inventoryService";

export const ItemNameCard = ({ itemObject }) => {
    const [itemTaskData, setItemTaskData] = useState({});

    useEffect(() => {
        getItemTaskInfoByItemId(itemObject.id).then((data) =>
            setItemTaskData(data[0])
        );
    }, [itemObject]);

    return (
        <Card m="2">
            <Strong>{itemTaskData.task?.taskName}</Strong>: {itemObject.name}
        </Card>
    );
};
