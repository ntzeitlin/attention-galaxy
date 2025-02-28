/* eslint-disable react/prop-types */
import { Card } from "@radix-ui/themes";

export const MiseEnPlaceItemCard = ({ taskWithTaskItemObject }) => {
    const checkItemOnHandStatus = () => {
        const itemArray = taskWithTaskItemObject.taskitems;
        {
            /* For each Task in a project: 
            Check to see if all items are on hand
            if all items are on hand, then display that
            if not, warn user that items are still needed 

            */
        }
        let itemArrayLength = itemArray.length;
        for (let item of itemArray) {
            if (
                !Object.hasOwnProperty.call(item, "onHand") ||
                item.onHand === false
            ) {
                itemArrayLength--;
            }
        }
        return itemArrayLength === itemArray.length;
    };
    return (
        <Card
            my="2"
            style={{
                backgroundColor: checkItemOnHandStatus()
                    ? "rgba(0, 0, 255, 0.5)"
                    : "rgba(255, 0, 0, 0.5)",
            }}
        >
            {taskWithTaskItemObject.taskName}:{" "}
            {checkItemOnHandStatus()
                ? "everything on hand"
                : "still need items"}
        </Card>
    );
};
