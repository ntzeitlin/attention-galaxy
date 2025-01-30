import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
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
        isObject: true,
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
            navigate(`/task/${taskData.id}/edit`)
        );
    };

    return (
        <Container width="60%" m="5">
            <Card>
                <Heading align="center" mt="4">
                    Edit Item
                </Heading>
                <Section>
                    <Flex direction="column" align="center">
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
                        <Flex gap="2" align="center">
                            <RadioGroup.Root
                                defaultValue={itemData?.isObject}
                                onValueChange={(event) => {
                                    console.log(event);
                                    // const itemDataCopy = { ...itemData };
                                    // itemDataCopy.isObject = event.target.value;
                                    // setItemData(itemDataCopy);
                                }}
                            >
                                <Text as="label" size="2">
                                    <RadioGroup.Item
                                        size="2"
                                        name="resource-type"
                                        value={true}
                                    />
                                    Object
                                </Text>
                                <Text as="label" size="2">
                                    <RadioGroup.Item
                                        size="2"
                                        name="resource-type"
                                        value={false}
                                    />
                                    Information
                                </Text>
                            </RadioGroup.Root>
                        </Flex>
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
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Quantity..."
                            value={itemData.resourceLink}
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
                        <Button m="2" color="red" onClick={() => {}}>
                            Delete Item
                        </Button>
                    </Flex>
                </Section>
            </Card>
        </Container>
    );
};
