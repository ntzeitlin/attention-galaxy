import { Button, Card, Flex, Heading, Section } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getTaskItemsByTaskId } from "../../../services/taskService";

export const TaskItemListCard = ({ taskId }) => {
    const [taskItemsArray, setTaskItemsArray] = useState([]);

    useEffect(() => {
        getTaskItemsByTaskId(taskId).then((data) => setTaskItemsArray(data));
    }, [taskId]);

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
                        window.alert("You thought that would do anything?");
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
