import { useEffect, useState } from "react";
import { getProjectsByLocationId } from "../../services/locationService";
import { Card } from "@radix-ui/themes";

export const ProjectNameCard = ({ locationId }) => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        getProjectsByLocationId(locationId).then((data) =>
            setProjectList(data)
        );
    }, []);

    return projectList.map((projectLocation) => {
        return (
            <Card m="2" key={projectLocation.projectId}>
                {projectLocation.project?.name}
            </Card>
        );
    });
};
