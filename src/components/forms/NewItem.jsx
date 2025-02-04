import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteItemByItemId,
    getItemDataByItemId,
    updateItemByItemId,
} from "../../services/inventoryService";
import {
    AlertDialog,
    Button,
    Card,
    Container,
    Flex,
    Heading,
    RadioGroup,
    Section,
    Select,
    Text,
    TextField,
} from "@radix-ui/themes";
import { getLocationsByUserId } from "../../services/locationService";

export const NewItem = ({ currentUser }) => {
    const { itemId } = useParams();
    const [taskData, setTaskData] = useState({});
    const [userLocations, setUserLocations] = useState([]);
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

    useEffect(() => {
        getLocationsByUserId(currentUser.id).then((data) =>
            setUserLocations(data)
        );
    }, [currentUser]);

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
                        <Text as="label">Item Location:</Text>
                        <Select.Root
                            m="2"
                            value={itemData.locationId}
                            onValueChange={(event) => {
                                const itemDataCopy = { ...itemData };
                                itemDataCopy.locationId = event;
                                setItemData(itemDataCopy);
                            }}
                        >
                            <Select.Trigger placeholder="Item Location.." />
                            <Select.Content>
                                {userLocations.map((locationObject) => {
                                    return (
                                        <Select.Item
                                            key={locationObject.id}
                                            value={locationObject.id}
                                        >
                                            {locationObject.name}
                                        </Select.Item>
                                    );
                                })}
                            </Select.Content>
                        </Select.Root>
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
                        {currentUser.id === itemData.userId ? (
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                    <Button m="2" color="red">
                                        Delete Item
                                    </Button>
                                </AlertDialog.Trigger>
                                <AlertDialog.Content size="1" maxWidth="300px">
                                    <AlertDialog.Title>
                                        Delete Item
                                    </AlertDialog.Title>
                                    <AlertDialog.Description size="2">
                                        Are you sure? This will delete the item
                                        permanently.
                                    </AlertDialog.Description>

                                    <Flex gap="3" mt="4" justify="end">
                                        <AlertDialog.Cancel>
                                            <Button variant="soft" color="gray">
                                                Cancel
                                            </Button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action>
                                            <Button
                                                variant="solid"
                                                color="red"
                                                onClick={() => {
                                                    handleDeleteItem();
                                                }}
                                            >
                                                Delete Item
                                            </Button>
                                        </AlertDialog.Action>
                                    </Flex>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        ) : (
                            ""
                        )}
                    </Flex>
                </Section>
            </Card>
        </Container>
    );
};
