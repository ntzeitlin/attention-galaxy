import { Route, Routes } from "react-router-dom";
import { TestComponent } from "../components/detail/TestComponent";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<TestComponent />} />
            </Route>
        </Routes>
    );
};
