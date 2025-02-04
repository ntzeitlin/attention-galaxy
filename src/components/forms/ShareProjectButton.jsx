import { AlertDialog, Button, Flex, Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getAllUserData } from "../../services/userService";
import { createUserProjects } from "../../services/projectService";

export const ShareProjectButton = ({ projectId }) => {
    const [userList, setUserList] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("select user");

    useEffect(() => {
        getAllUserData().then((data) => setUserList(data));
    }, []);

    const handleShareProject = () => {
        const submissionObject = {
            projectId: parseInt(projectId),
            userId: parseInt(selectedUserId),
            isOwner: false,
        };
        createUserProjects(submissionObject).then(
            window.alert("Project Shared!")
        );
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button m="2" color="green">
                    Share Project
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content size="1" maxWidth="300px">
                <AlertDialog.Title>Share Project</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    <Text>
                        Select the User you would like to share the project
                        with:
                    </Text>
                    <Select.Root
                        onValueChange={(value) => setSelectedUserId(value)}
                    >
                        <Select.Trigger />
                        <Select.Content>
                            {userList.map((userObject) => (
                                <Select.Item
                                    key={`share-user-key-${userObject.id}`}
                                    value={userObject?.id}
                                >
                                    {userObject?.fullName}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
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
                            color="green"
                            onClick={() => {
                                handleShareProject();
                            }}
                        >
                            Share Project
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};
