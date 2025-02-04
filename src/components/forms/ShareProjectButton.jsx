import { useEffect, useState } from "react";
import { getAllUserData } from "../../services/userService";
import {
    createUserProjects,
    getUserProjectByProjectId,
} from "../../services/projectService";
import { ShareProjectAlertDialog } from "./ShareProjectAlertDialog";

export const ShareProjectButton = ({ projectId, currentUser }) => {
    const [userList, setUserList] = useState([]);
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [userProjectsData, setUserProjectsData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("select user");

    useEffect(() => {
        fetchAndSetUserData();
    }, [currentUser]);

    useEffect(() => {
        fetchAndSetUserProjects();
    }, [userList]);

    const fetchAndSetUserData = () => {
        getAllUserData().then((data) => {
            setUserList(data);
        });
    };
    const fetchAndSetUserProjects = () => {
        getUserProjectByProjectId(projectId)
            .then((data) => setUserProjectsData(data))
            .then(() => {
                setFilteredUserList(
                    // need to filter userList down to users who the project has not been shared with and not the current user
                    filterUserList()
                );
            });
    };

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
        createUserProjects(submissionObject).then(() => {
            fetchAndSetUserData();
            fetchAndSetUserProjects();
            window.alert("Shared with User");
        });
    };

    return (
        <ShareProjectAlertDialog
            setSelectedUserId={setSelectedUserId}
            filteredUserList={filteredUserList}
            handleShareProject={handleShareProject}
        />
    );
};
