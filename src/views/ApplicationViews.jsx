import { Outlet, Route, Routes } from "react-router-dom";
import { TestComponent } from "../components/TestComponent";
import { NavBar } from "../components/nav/NavBar";
import { Footer } from "../components/nav/Footer";
import { useEffect, useState } from "react";
import { LocationList } from "../components/lists/LocationList";
import { NewLocation } from "../components/forms/NewLocation";
import { LocationDetail } from "../components/detail/LocationDetail";
import { ProjectList } from "../components/lists/ProjectsList";
import { InventoryList } from "../components/lists/InventoryList";
import { NewProject } from "../components/forms/NewProject";
import { ProjectDetail } from "../components/detail/ProjectDetail";
import { NewTask } from "../components/forms/NewTask";
import { NewItem } from "../components/forms/NewItem";

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
                <Route
                    index
                    element={<TestComponent currentLocation={"Home Index"} />}
                />
                <Route
                    path="locations"
                    element={<LocationList currentUser={currentUser} />}
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
                    element={<ProjectList currentUser={currentUser} />}
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
                    <Route path=":taskId" element={<>TaskDetailView</>} />
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
                    element={<InventoryList currentUser={currentUser} />}
                ></Route>
                <Route
                    path="profile"
                    element={
                        <TestComponent
                            currentLocation={`Profile for user #${currentUser.id}`}
                        />
                    }
                ></Route>
            </Route>
        </Routes>
    );
};
