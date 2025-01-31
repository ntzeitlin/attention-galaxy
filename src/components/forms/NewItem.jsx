import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteItemByItemId,
    getItemDataByItemId,
    updateItemByItemId,
} from "../../services/inventoryService";
import {
    Button,
    Card,
    Container,
    Flex,
    Heading,
    RadioGroup,
    Section,
    Text,
    TextField,
} from "@radix-ui/themes";

export const NewItem = () => {
    const { itemId } = useParams();
    const [taskData, setTaskData] = useState({});
    const navigate = useNavigate();

    const [itemData, setItemData] = useState({
        id: "",
        name: "",
        description: "",
        quantity: 1,
        isObject: "",
        resourceLink: "",
        locationId: 0,
        userId: 0,
    });

    useEffect(() => {
        getItemDataByItemId(itemId).then((data) => {
            setItemData(data.item);
            setTaskData(data.task);
        });
    }, [itemId]);

    const handleSaveItem = () => {
        updateItemByItemId(itemId, itemData).then(
            navigate(`/task/${taskData.id}`)
        );
    };

    const handleDeleteItem = () => {
        deleteItemByItemId(itemId).then(navigate(`/task/${taskData.id}`));
    };

    return (
        <Container width="60%" m="5">
            <Card>
                <Heading align="center" mt="4">
                    Edit Item
                </Heading>
                <Section>
                    <Flex direction="column">
                        <Flex gap="2" my="2">
                            <RadioGroup.Root
                                value={itemData?.isObject ? "true" : "false"}
                                onValueChange={(event) => {
                                    // console.log(event);
                                    const itemDataCopy = { ...itemData };
                                    itemDataCopy.isObject = event === "true";
                                    setItemData(itemDataCopy);
                                }}
                            >
                                <RadioGroup.Item
                                    size="2"
                                    name="resource-type"
                                    value="true"
                                >
                                    Object
                                </RadioGroup.Item>

                                <RadioGroup.Item
                                    size="2"
                                    name="resource-type"
                                    value="false"
                                >
                                    Information
                                </RadioGroup.Item>
                            </RadioGroup.Root>
                        </Flex>
                        <Text as="label">Item Name:</Text>

                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Item Name..."
                            value={itemData.name}
                            onChange={(event) => {
                                const itemDataCopy = { ...itemData };
                                itemDataCopy.name = event.target.value;
                                setItemData(itemDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <Text as="label">Resource Link:</Text>
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Resource Link..."
                            value={itemData.resourceLink}
                            onChange={(event) => {
                                const itemDataCopy = { ...itemData };
                                itemDataCopy.resourceLink = event.target.value;
                                setItemData(itemDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <Text as="label">Quantity:</Text>
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Quantity..."
                            type="number"
                            value={itemData.quantity}
                            onChange={(event) => {
                                const itemDataCopy = { ...itemData };
                                itemDataCopy.quantity = parseInt(
                                    event.target.value
                                );
                                setItemData(itemDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <Button
                            m="2"
                            onClick={() => {
                                handleSaveItem();
                            }}
                        >
                            Save Item
                        </Button>
                        <Button
                            m="2"
                            color="red"
                            onClick={() => {
                                handleDeleteItem();
                            }}
                        >
                            Delete Item
                        </Button>
                    </Flex>
                </Section>
            </Card>
        </Container>
    );
};
