import { Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDataByUserId } from "../../services/userService";

export const SharedProjectCard = ({ sharedProjectObject }) => {
    const [projectOwnerData, setProjectOwnerData] = useState({});

    useEffect(() => {
        getUserDataByUserId(sharedProjectObject.userId).then((data) =>
            setProjectOwnerData(data)
        );
    }, [sharedProjectObject]);

    return (
        <Card>
            <Link to={`/project/${sharedProjectObject.projectId}`}>
                {sharedProjectObject.project?.name}
            </Link>
            <Text as="div">Project Owner: {projectOwnerData.userName}</Text>
        </Card>
    );
};
