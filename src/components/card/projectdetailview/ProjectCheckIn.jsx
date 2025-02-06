import { Button, Grid } from "@radix-ui/themes";
import { updateProjectByProjectId } from "../../../services/projectService";

export const ProjectCheckIn = ({ projectData, fetchAndSetProjectData }) => {
    const handleCheckIn = () => {
        const submissionObject = {
            ...projectData,
            ageSinceTouch: 0,
        };

        updateProjectByProjectId(projectData.id, submissionObject).then(() => {
            fetchAndSetProjectData();
        });
    };

    const handleIgnore = () => {
        const submissionObject = {
            ...projectData,
            ageSinceTouch: projectData.ageSinceTouch + 1,
        };
        updateProjectByProjectId(projectData.id, submissionObject).then(() => {
            fetchAndSetProjectData();
        });
    };

    return (
        <Grid>
            <Button
                m="1"
                onClick={() => {
                    handleCheckIn();
                }}
            >
                Check-In
            </Button>
            <Button
                color="red"
                m="1"
                onClick={() => {
                    handleIgnore();
                }}
            >
                Ignore
            </Button>
        </Grid>
    );
};
