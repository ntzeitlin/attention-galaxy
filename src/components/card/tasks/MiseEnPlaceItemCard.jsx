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
        for (let item of itemArray) {
            if (
                !Object.hasOwnProperty.call(item, "onHand") ||
                item.onHand === false
            ) {
                return false;
            }
            return true;
        }
    };
    return (
        <Card
            my="2"
            style={{
                backgroundColor: checkItemOnHandStatus() ? "blue" : "red",
            }}
        >
            {taskWithTaskItemObject.taskName}:{" "}
            {checkItemOnHandStatus()
                ? "everything on hand"
                : "still need items"}
        </Card>
    );
};
