import { useEffect, useState } from "react";
import { getProjectsByLocationId } from "../../services/locationService";

import { ProjectNameCard } from "./ProjectNameCard";

export const ProjectNameList = ({ locationId }) => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        getProjectsByLocationId(locationId).then((data) =>
            setProjectList(data)
        );
    }, []);

    return projectList.map((projectLocation) => {
        return (
            <ProjectNameCard
                key={`project-summary-card-${projectLocation.id}`}
                projectObject={projectLocation}
            />
        );
    });
};
