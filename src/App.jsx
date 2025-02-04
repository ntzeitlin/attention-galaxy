// import "./App.css";
import "@radix-ui/themes/styles.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";
import { useEffect, useState } from "react";
import { Theme, ThemePanel } from "@radix-ui/themes";

export const App = () => {
    const [displayMode, setDisplayMode] = useState({
        appearance: "dark",
        grayColor: "sage",
        accentColor: "yellow",
    });

    useEffect(() => {
        setDisplayMode(displayMode);
    }, [displayMode]);

    useEffect(() => {});

    return (
        <Theme
            accentColor={displayMode.accentColor}
            grayColor={displayMode.grayColor}
            appearance={displayMode.appearance}
        >
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="*"
                    element={
                        <Authorized>
                            <ApplicationViews setDisplayMode={setDisplayMode} />
                        </Authorized>
                    }
                />
            </Routes>
        </Theme>
    );
};
