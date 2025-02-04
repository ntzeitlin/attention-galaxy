import { Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const ProjectNameCard = ({ projectObject }) => {
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
            <Link to={`/project/${projectObject.project?.id}`}>
                {projectObject.project?.name}
            </Link>
        </Card>
    );
};
