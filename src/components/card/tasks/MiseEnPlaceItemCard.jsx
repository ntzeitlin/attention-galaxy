import { Card } from "@radix-ui/themes";

export const MiseEnPlaceItemCard = ({ taskWithTaskItemObject }) => {
    const checkItemOnHandStatus = () => {
        const itemArray = taskWithTaskItemObject.taskitems;

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
        <Card>
            {taskWithTaskItemObject.taskName}:{" "}
            {checkItemOnHandStatus()
                ? "everything on hand"
                : "still need items"}
        </Card>
    );
};
