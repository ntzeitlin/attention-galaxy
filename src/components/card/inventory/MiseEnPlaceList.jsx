import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getUserProjectByProjectId } from "../../../services/projectService";

export const MiseEnPlaceListCard = ({ currentUser, projectId }) => {
    const [userProjectData, setUserProjectData] = useState({});

    useEffect(() => {
        getUserProjectByProjectId(projectId).then((data) =>
            setUserProjectData(data[0])
        );
    }, [projectId]);

    return (
        <Card>
            <Flex direction="column">
                <Heading align="center" mt="4">
                    Mise en Place
                </Heading>
                {/* Not sure if I need a button here. Mise en Place should be generated from tasks */}
                {/* {currentUser.id === userProjectData?.userId ? (
                    <Button size="1" mt="1" color="green" onClick={() => {}}>
                        Add Item
                    </Button>
                ) : (
                    ""
                )} */}
            </Flex>
        </Card>
    );
};
