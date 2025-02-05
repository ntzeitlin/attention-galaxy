import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <BrowserRouter>
        {/* <Theme accentColor="yellow" grayColor="sage" appearance="dark"> */}
        <App />
        {/* <ThemePanel /> */}
        {/* </Theme> */}
    </BrowserRouter>
    // </StrictMode>
);
