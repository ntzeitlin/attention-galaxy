import { Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDataByUserId } from "../../services/userService";
import { getUserProjectByProjectId } from "../../services/projectService";

export const SharedProjectCard = ({ sharedProjectObject }) => {
    const [projectOwnerData, setProjectOwnerData] = useState({});
    const [projectOwnerName, setProjectOwnerName] = useState("");

    useEffect(() => {
        getUserProjectByProjectId(sharedProjectObject.projectId).then(
            (data) => {
                setProjectOwnerData(
                    data.filter((projectObj) => projectObj.isOwner === true)
                );
            }
        );
    }, [sharedProjectObject]);

    useEffect(() => {
        if (projectOwnerData[0]?.userId) {
            getUserDataByUserId(projectOwnerData[0]?.userId).then((data) =>
                setProjectOwnerName(data)
            );
        }
    }, [projectOwnerData]);

    return (
        <Card>
            <Link to={`/project/${sharedProjectObject.projectId}`}>
                {sharedProjectObject.project?.name}
            </Link>
            <Text as="div">
                Project Owner: {projectOwnerName?.fullName || "Loading..."}
            </Text>
            <Text as="div">
                Owner Email: {projectOwnerName?.email || "Loading..."}
            </Text>
        </Card>
    );
};
