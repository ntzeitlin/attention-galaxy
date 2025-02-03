import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    deleteLocationByLocationId,
    getLocationByLocationId,
    getProjectsByLocationId,
    updateLocationByLocationId,
} from "../../services/locationService";
import {
    Button,
    Card,
    Container,
    Flex,
    Heading,
    Section,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { deleteProjectByProjectId } from "../../services/projectService";

export const NewLocation = () => {
    const { locationId } = useParams();
    const location = useLocation();
    const [locationData, setLocationData] = useState({
        id: "",
        name: "",
        address: "",
        description: "",
        gpscoords: "",
        userId: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        getLocationByLocationId(locationId).then((data) =>
            setLocationData(data)
        );
    }, []);

    const handleSaveLocation = () => {
        updateLocationByLocationId(locationId, locationData).then(
            navigate(`/location/${locationId}`)
        );
    };

    const handleDeleteLocation = () => {
        getProjectsByLocationId(locationId)
            .then((data) => {
                for (const projectLocationObject of data) {
                    deleteProjectByProjectId(projectLocationObject.projectId);
                }
            })
            .then(() => {
                deleteLocationByLocationId(locationId).then(() => {
                    navigate("/locations");
                });
            });
    };

    return (
        <Container width="60%" m="5">
            <Card>
                <Heading align="center" mt="4">
                    Edit Location
                </Heading>
                <Section>
                    <Flex direction="column">
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Location Name..."
                            value={locationData.name}
                            onChange={(event) => {
                                const locationDataCopy = { ...locationData };
                                locationDataCopy.name = event.target.value;
                                setLocationData(locationDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter Address."
                            value={locationData.address}
                            onChange={(event) => {
                                const locationDataCopy = { ...locationData };
                                locationDataCopy.address = event.target.value;
                                setLocationData(locationDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <TextField.Root
                            m="2"
                            size="2"
                            placeholder="Enter GPS coordinates."
                            value={locationData.gpscoords}
                            onChange={(event) => {
                                const locationDataCopy = { ...locationData };
                                locationDataCopy.gpscoords = event.target.value;
                                setLocationData(locationDataCopy);
                            }}
                        >
                            <TextField.Slot></TextField.Slot>
                        </TextField.Root>
                        <TextArea
                            m="2"
                            placeholder="Location Description..."
                            value={locationData.description}
                            onChange={(event) => {
                                const locationDataCopy = { ...locationData };
                                locationDataCopy.description =
                                    event.target.value;
                                setLocationData(locationDataCopy);
                            }}
                        />
                        <Button
                            m="2"
                            onClick={() => {
                                handleSaveLocation();
                            }}
                        >
                            Save Location
                        </Button>
                        <Button
                            color="red"
                            m="2"
                            onClick={() => {
                                handleDeleteLocation();
                            }}
                        >
                            Delete Location
                        </Button>
                    </Flex>
                </Section>
            </Card>
        </Container>
    );
};
