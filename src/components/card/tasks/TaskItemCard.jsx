import { Pencil2Icon } from "@radix-ui/react-icons";
import { CheckboxCards, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateTaskItemByTaskItemId } from "../../../services/taskService";
import { getLocationByLocationId } from "../../../services/locationService";

export const TaskItemCard = ({ itemObject, fetchAndSetTaskItems }) => {
    const [taskItemData, setTaskItemData] = useState({});
    const [locationInfo, setLocationInfo] = useState({});
    const [onHand, setOnHand] = useState();

    useEffect(() => {
        setTaskItemData(itemObject);
    }, [itemObject]);

    useEffect(() => {
        taskItemData.onHand ? setOnHand(true) : setOnHand(false);
    }, [taskItemData]);

    useEffect(() => {
        getLocationByLocationId(taskItemData.item?.locationId).then((data) =>
            setLocationInfo(data)
        );
    }, [taskItemData.item]);

    const handleCheckItem = () => {
        const submissionObject = {
            taskId: itemObject.taskId,
            itemId: itemObject.itemId,
            onHand: !onHand,
        };

        updateTaskItemByTaskItemId(itemObject.id, submissionObject).then(() => {
            fetchAndSetTaskItems();
        });
    };

    return (
        <CheckboxCards.Root>
            <Flex gap="2">
                <Text my="6">
                    <Link to={`/item/${itemObject.id}/edit`}>
                        <Pencil2Icon />
                    </Link>{" "}
                </Text>
                <CheckboxCards.Item
                    style={{ backgroundColor: onHand ? "blue" : "red" }}
                    checked={onHand}
                    onClick={() => handleCheckItem()}
                >
                    <Flex direction="column" width="100%">
                        <Text weight="bold">{itemObject.item?.name}</Text>
                        <Text>{onHand ? "on hand" : "need to pick up"}</Text>
                        <Text>Located: {locationInfo.name}</Text>
                    </Flex>
                </CheckboxCards.Item>
            </Flex>
        </CheckboxCards.Root>
    );
};
