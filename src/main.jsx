import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import { App } from "./App.jsx";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Theme>
                <App />
                {/* <ThemePanel /> */}
            </Theme>
        </BrowserRouter>
    </StrictMode>
);
