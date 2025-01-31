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
            <CheckboxCards.Item value={itemObject.id}>
                <Flex direction="column" width="100%">
                    <Text weight="bold">{itemObject.item?.name}</Text>
                </Flex>
            </CheckboxCards.Item>
            <Text>
                <Link to={`/item/${itemObject.id}/edit`}>Edit Item</Link>{" "}
            </Text>
        </Flex>
    );
};
