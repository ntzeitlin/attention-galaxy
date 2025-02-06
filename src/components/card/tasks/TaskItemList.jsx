import {
    Box,
    Button,
    Card,
    CheckboxCards,
    Flex,
    Grid,
    Heading,
    Section,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getTaskItemsByTaskId } from "../../../services/taskService";
import {
    createNewItem,
    createNewTaskItem,
} from "../../../services/inventoryService";
import { Link, useNavigate } from "react-router-dom";
import { TaskItemCard } from "./TaskItemCard";

export const TaskItemListCard = ({ taskId, currentUser, locationId }) => {
    const [taskItemsArray, setTaskItemsArray] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetTaskItems();
    }, [taskId]);

    const fetchAndSetTaskItems = () => {
        getTaskItemsByTaskId(taskId).then((data) => setTaskItemsArray(data));
    };

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
            navigate(`/item/${data.id}/edit`);
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
                <Grid columns="4" gap="4">
                    {taskItemsArray.map((itemObject) => {
                        return (
                            <Box p="3" key={itemObject.id}>
                                <TaskItemCard
                                    itemObject={itemObject}
                                    fetchAndSetTaskItems={fetchAndSetTaskItems}
                                />
                            </Box>
                        );
                    })}
                </Grid>
            </Section>
        </Card>
    );
};
