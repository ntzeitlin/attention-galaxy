import { Card, Strong, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getItemTaskInfoByItemId } from "../../services/inventoryService";
import { Link, useLocation } from "react-router-dom";
import { getProjectInfoByProjectId } from "../../services/projectService";
import { getLocationByLocationId } from "../../services/locationService";

export const ItemNameCard = ({ itemObject }) => {
    const location = useLocation();
    const [itemTaskData, setItemTaskData] = useState({});
    const [projectData, setProjectData] = useState({
        id: "",
        name: "",
    });
    const [taskLocationData, setTaskLocationData] = useState({});

    useEffect(() => {
        getItemTaskInfoByItemId(itemObject.id).then((data) =>
            setItemTaskData(data[0])
        );
    }, [itemObject]);

    useEffect(() => {
        if (itemTaskData.task?.projectId) {
            getProjectInfoByProjectId(itemTaskData.task?.projectId).then(
                (data) => setProjectData(data)
            );
        }

        if (itemTaskData.task?.locationId) {
            getLocationByLocationId(itemTaskData.task?.locationId).then(
                (data) => setTaskLocationData(data)
            );
        }
    }, [itemTaskData]);

    return (
        <Card
            m="2"
            style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                    "0px 10px 20px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            <Link to={`/item/${itemObject.id}/edit`}>
                <Text as="div">
                    <Strong>Item:</Strong> {itemObject.name}{" "}
                    {itemObject.quantity ? `x${itemObject.quantity}` : ""}
                </Text>
            </Link>
            <Text as="div">Task: {itemTaskData.task?.taskName}</Text>

            {location.pathname.includes("location") ? (
                ""
            ) : (
                <Text as="div">Task Location: {taskLocationData.name}</Text>
            )}

            <Text as="div">Project: {projectData?.name || "Loading..."}</Text>
        </Card>
    );
};
