import { Card } from "@radix-ui/themes";

export const ItemNameCard = ({ itemObject }) => {
    return <Card m="2">{itemObject.name}</Card>;
};
