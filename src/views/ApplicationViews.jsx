import { Outlet, Route, Routes } from "react-router-dom";
import { TestComponent } from "../components/TestComponent";
import { NavBar } from "../components/nav/NavBar";
import { Footer } from "../components/nav/Footer";
import { useEffect, useState } from "react";
import { NewLocation } from "../components/forms/NewLocation";
import { LocationDetail } from "../components/detail/LocationDetailView";
import { ProjectListView } from "./ProjectsView";
import { InventoryListView } from "./InventoriesView";
import { NewProject } from "../components/forms/NewProject";
import { ProjectDetail } from "../components/detail/ProjectDetailView";
import { NewTask } from "../components/forms/NewTask";
import { NewItem } from "../components/forms/NewItem";
import { LocationListView } from "./LocationsView";
import { HomeView } from "./HomeView";
import { ProfileView } from "./ProfileView";
import { ManageTask } from "../components/card/manage/ManageTask";

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const localUser = localStorage.getItem("attention_astronaut");
        const localUserObject = JSON.parse(localUser);
        setCurrentUser(localUserObject);
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                        <Footer />
                    </>
                }
            >
                <Route index element={<HomeView currentUser={currentUser} />} />
                <Route
                    path="locations"
                    element={<LocationListView currentUser={currentUser} />}
                ></Route>

                <Route path="location">
                    <Route
                        path=":locationId"
                        element={<LocationDetail currentUser={currentUser} />}
                    />
                    <Route path=":locationId/edit" element={<NewLocation />} />
                </Route>

                <Route
                    path="projects"
                    element={<ProjectListView currentUser={currentUser} />}
                ></Route>

                <Route path="project">
                    <Route
                        path=":projectId"
                        element={<ProjectDetail currentUser={currentUser} />}
                    />
                    <Route
                        path=":projectId/edit"
                        element={<NewProject currentUser={currentUser} />}
                    />
                </Route>

                <Route path="task">
                    <Route
                        path=":taskId"
                        element={<ManageTask currentUser={currentUser} />}
                    />
                    <Route
                        path=":taskId/edit"
                        element={<NewTask currentUser={currentUser} />}
                    />
                </Route>

                <Route path="item">
                    <Route path=":itemId" element={<></>} />
                    <Route
                        path=":itemId/edit"
                        element={<NewItem currentUser={currentUser} />}
                    />
                </Route>

                <Route
                    path="inventory"
                    element={<InventoryListView currentUser={currentUser} />}
                ></Route>
                <Route path="profile" element={<ProfileView />}></Route>
            </Route>
        </Routes>
    );
};
