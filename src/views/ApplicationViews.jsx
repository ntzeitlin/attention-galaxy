import { Outlet, Route, Routes } from "react-router-dom";
import { TestComponent } from "../components/detail/TestComponent";
import { NavBar } from "../components/nav/NavBar";
import { Footer } from "../components/nav/Footer";

export const ApplicationViews = () => {
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
                    element={<TestComponent currentLocation={"Locations"} />}
                ></Route>
                <Route
                    path="projects"
                    element={<TestComponent currentLocation={"Projects"} />}
                ></Route>
                <Route
                    path="inventory"
                    element={<TestComponent currentLocation={"Inventory"} />}
                ></Route>
                <Route
                    path="profile"
                    element={<TestComponent currentLocation={"Profile"} />}
                ></Route>
            </Route>
        </Routes>
    );
};
