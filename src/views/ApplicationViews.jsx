import { Outlet, Route, Routes } from "react-router-dom";
import { TestComponent } from "../components/detail/TestComponent";
import { NavBar } from "../components/nav/NavBar";
import { Footer } from "../components/nav/Footer";
import { useEffect, useState } from "react";
import { LocationList } from "../components/lists/LocationList";

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
                <Route
                    path="locations/new"
                    element={
                        <TestComponent
                            currentLocation={`New Location View for user #${currentUser.id}`}
                        />
                    }
                />
                <Route path="location">
                    <Route
                        path=":locationId"
                        element={
                            <TestComponent
                                currentLocation={`Location Detail for user #${currentUser.id}`}
                            />
                        }
                    />
                    <Route
                        path=":locationId/edit"
                        element={
                            <TestComponent
                                currentLocation={`Location Edit Detail for user #${currentUser.id}`}
                            />
                        }
                    />
                </Route>
                <Route
                    path="projects"
                    element={
                        <TestComponent
                            currentLocation={`Projects for user #${currentUser.id}`}
                        />
                    }
                ></Route>
                <Route
                    path="inventory"
                    element={
                        <TestComponent
                            currentLocation={`Inventory for user #${currentUser.id}`}
                        />
                    }
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
