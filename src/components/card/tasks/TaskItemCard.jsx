import { Pencil2Icon } from "@radix-ui/react-icons";
import { Card, CheckboxCards, Flex, Text } from "@radix-ui/themes";
import { Link, Links } from "react-router-dom";

export const TaskItemCard = ({ itemObject }) => {
    return (
        // <Card m="2">
        //     <Link to={`/item/${itemObject.id}/edit`}>
        //         {itemObject.item?.name}
        //     </Link>
        //     <Text>On hand?</Text>

        // </Card>
        <Flex gap="2">
            <Text mt="3">
                Edit{" "}
                <Link to={`/item/${itemObject.id}/edit`}>
                    <Pencil2Icon />
                </Link>{" "}
            </Text>
            <CheckboxCards.Item value={itemObject.id}>
                <Flex direction="column" width="100%">
                    <Text weight="bold">{itemObject.item?.name}</Text>
                </Flex>
            </CheckboxCards.Item>
        </Flex>
    );
};
