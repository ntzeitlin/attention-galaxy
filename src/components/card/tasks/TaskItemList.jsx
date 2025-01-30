import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getTaskItemsByTaskId } from "../../../services/taskService";
import {
    createNewItem,
    createNewTaskItem,
} from "../../../services/inventoryService";

export const TaskItemListCard = ({ taskId, currentUser, locationId }) => {
    const [taskItemsArray, setTaskItemsArray] = useState([]);

    useEffect(() => {
        getTaskItemsByTaskId(taskId).then((data) => setTaskItemsArray(data));
    }, [taskId]);

    const handleNewTaskItem = () => {
        // create new item for database
        const newItemObject = {
            name: "Default New Item",
            description: "",
            quantity: 0,
            isObject: false,
            resourceLink: null,
            locationId: locationId,
            userId: currentUser.id,
        };

        createNewItem(newItemObject).then((data) => {
            createNewTaskItem({
                taskId: parseInt(taskId),
                itemId: data.id,
            });
        });
    };

    return (
        <Card>
            <Flex direction="column">
                <Heading mt="4" align="center">
                    Task Items
                </Heading>
                <Button
                    mt=""
                    ml="2"
                    size="1"
                    color="green"
                    onClick={() => {
                        handleNewTaskItem();
                    }}
                >
                    Add Item
                </Button>
            </Flex>
            <Section>
                <Flex direction="column">
                    {taskItemsArray.map((itemObject) => {
                        return (
                            <Card m="2" key={itemObject.id}>
                                {itemObject.item?.name}
                            </Card>
                        );
                    })}
                </Flex>
            </Section>
        </Card>
    );
};
