/* eslint-disable react/prop-types */
import { Container, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
    getLocationByLocationId,
    getProjectsByLocationId,
} from "../../services/locationService";
import { useParams } from "react-router-dom";
import { LocationInfoCard } from "../card/locationdetailview/LocationInfo";
import { ProjectListCard } from "../card/locationdetailview/ProjectListCard";
import { LocationInventoryListCard } from "../card/locationdetailview/LocationInventoryList";

export const LocationDetail = ({ currentUser }) => {
    const { locationId } = useParams();
    const [locationData, setLocationData] = useState({
        id: "",
        name: "",
        address: "",
        description: "",
        gpscoords: "",
        userId: "",
    });

    const [locationProjects, setLocationProjects] = useState([]);

    useEffect(() => {
        getLocationByLocationId(locationId).then((data) =>
            setLocationData(data)
        );
    }, []);

    useEffect(() => {
        getProjectsByLocationId(locationId).then((data) =>
            setLocationProjects(data)
        );
    }, [locationId]);

    return (
        <Container width="90%" m="5">
            <Flex gap="4" direction="row" justify="center">
                <LocationInfoCard
                    currentUser={currentUser}
                    locationData={locationData}
                />
                <ProjectListCard
                    locationProjects={locationProjects}
                    currentUser={currentUser}
                    locationData={locationData}
                />
                <LocationInventoryListCard
                    currentUser={currentUser}
                    locationData={locationData}
                />
            </Flex>
        </Container>
    );
};
