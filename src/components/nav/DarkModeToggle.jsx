import { Switch } from "@radix-ui/themes";
import { useState } from "react";

export const DarkModeSwitch = ({ setDisplayMode }) => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        if (darkMode) {
            setDisplayMode({
                apperance: "light",
                grayColor: "var(--gray-1)",
                accentColor: "indigo",
            });
        } else {
            setDisplayMode({
                appearance: "dark",
                grayColor: "sage",
                accentColor: "yellow",
            });
        }
        setDarkMode(!darkMode);
    };

    return <Switch onCheckedChange={toggleDarkMode} />;
};
