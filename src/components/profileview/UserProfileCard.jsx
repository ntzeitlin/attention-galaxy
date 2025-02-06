import { Card, Strong, Text } from "@radix-ui/themes";

export const UserProfileCard = ({ userData }) => {
    return (
        <Card m="4">
            <Text as="div">
                <Strong>Full Name: </Strong>
                {userData.fullName}
            </Text>
            <Text as="div">
                <Strong>Username: </Strong> {userData.userName}
            </Text>
            <Text as="div">
                <Strong>Email Address: </Strong> {userData.email}
            </Text>
            <Text as="div">
                <Strong>Project Count: </Strong> {userData.userprojects?.length}
            </Text>
        </Card>
    );
};
