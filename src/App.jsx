import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";
import { useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";


export const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="*"
                element={
                    <Authorized>
                        <ApplicationViews />
                    </Authorized>
                }
            />
        </Routes>
    );
};
