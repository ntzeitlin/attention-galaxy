import { useEffect, useState } from "react";
import { getUserDataByUserId } from "../services/userService";
import { Container, Heading, Section } from "@radix-ui/themes";
import { UserProfileCard } from "../components/profileview/UserProfileCard";

export const ProfileView = ({ currentUser }) => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserDataByUserId(currentUser.id).then((data) => setUserData(data));
    }, [currentUser]);

    return (
        <Container>
            <Section>
                <Heading align="center">User Profile</Heading>
                <UserProfileCard userData={userData} />
            </Section>
        </Container>
    );
};
