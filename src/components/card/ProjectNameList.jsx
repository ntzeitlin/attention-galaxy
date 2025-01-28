import { useEffect, useState } from "react";
import { getProjectsByLocationId } from "../../services/locationService";

import { ProjectSummaryCard } from "./ProjectSummaryCard";

export const ProjectNameCard = ({ locationId }) => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        getProjectsByLocationId(locationId).then((data) =>
            setProjectList(data)
        );
    }, []);

    return projectList.map((projectLocation) => {
        return (
            <ProjectSummaryCard
                key={`project-summary-card-${projectLocation.id}`}
                projectObject={projectLocation}
            />
        );
    });
};
