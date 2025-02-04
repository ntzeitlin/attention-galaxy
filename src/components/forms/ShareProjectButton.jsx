import { AlertDialog, Button, Flex, Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getAllUserData } from "../../services/userService";
import {
    createUserProjects,
    getUserProjectByProjectId,
} from "../../services/projectService";

export const ShareProjectButton = ({ projectId, currentUser }) => {
    const [userList, setUserList] = useState([]);
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [userProjectsData, setUserProjectsData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("select user");

    useEffect(() => {
        getAllUserData().then((data) => {
            setUserList(data);
        });
    }, [currentUser]);

    useEffect(() => {
        getUserProjectByProjectId(projectId).then((data) =>
            setUserProjectsData(data)
        );

        setFilteredUserList(
            // need to filter userList down to users who the project has not been shared with and not the current user
            filterUserList()
        );
    }, [userList]);

    const filterUserList = () => {
        const filteredList = userList.filter(
            (userObject) => userObject.id !== currentUser.id
        );
        const removeAlreadySharedUsers = filteredList.filter((userObject) => {
            return !userProjectsData.some(
                (userProjectObject) =>
                    userObject.id === userProjectObject.userId
            );
        });

        return removeAlreadySharedUsers;
    };

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
                            {filteredUserList.map((userObject) => (
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
