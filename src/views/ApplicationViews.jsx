import { Outlet, Route, Routes } from "react-router-dom";
import { TestComponent } from "../components/detail/TestComponent";
import { NavBar } from "../components/nav/NavBar";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<TestComponent />} />
            </Route>
        </Routes>
    );
};
