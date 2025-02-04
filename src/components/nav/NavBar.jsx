import { TabNav } from "@radix-ui/themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "./DarkModeToggle";

export const NavBar = ({ setDisplayMode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <TabNav.Root justify="center">
                <TabNav.Link asChild active={pathname === "/"}>
                    <Link to="/">Home</Link>
                </TabNav.Link>
                <TabNav.Link
                    asChild
                    active={
                        pathname === "/locations" ||
                        pathname.includes("location")
                    }
                >
                    <Link to="/locations">Locations</Link>
                </TabNav.Link>
                <TabNav.Link
                    asChild
                    active={
                        pathname === "/projects" ||
                        pathname.includes("project") ||
                        pathname.includes("task")
                    }
                >
                    <Link to="/projects">Projects</Link>
                </TabNav.Link>
                <TabNav.Link
                    asChild
                    active={
                        pathname === "/inventory" || pathname.includes("item")
                    }
                >
                    <Link to="/inventory">Inventory</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/profile"}>
                    <Link to="/profile">Profile</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === ""}>
                    {localStorage.getItem("attention_astronaut") ? (
                        <Link
                            to=""
                            onClick={() => {
                                localStorage.removeItem("attention_astronaut");
                                navigate("/login", { replace: true });
                            }}
                        >
                            Logout
                        </Link>
                    ) : (
                        ""
                    )}
                </TabNav.Link>
                <TabNav.Link>
                    <DarkModeSwitch setDisplayMode={setDisplayMode} />
                </TabNav.Link>
            </TabNav.Root>
            {pathname.includes("task") || pathname.includes("item") ? (
                <TabNav.Root justify="center">
                    {pathname.includes("task") ? (
                        <TabNav.Link asChild active={pathname.includes("task")}>
                            <Link
                                to={
                                    location.pathname.includes("edit")
                                        ? location.pathname.slice(0, -5)
                                        : null
                                }
                            >
                                Manage Task
                            </Link>
                        </TabNav.Link>
                    ) : (
                        ""
                    )}
                    {pathname.includes("item") ? (
                        <TabNav.Link asChild active={pathname.includes("item")}>
                            <Link>Manage Item</Link>
                        </TabNav.Link>
                    ) : (
                        ""
                    )}
                </TabNav.Root>
            ) : (
                ""
            )}
        </>
    );
};
