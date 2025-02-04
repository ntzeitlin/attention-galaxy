import { Card } from "@radix-ui/themes";

export const ItemNameCard = ({ itemObject }) => {
    return <Card>{itemObject.name}</Card>;
};
