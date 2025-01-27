import { TabNav } from "@radix-ui/themes";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const NavBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <TabNav.Root justify="center">
                <TabNav.Link asChild active={pathname === "/"}>
                    <Link to="/">Home</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/locations"}>
                    <Link to="/locations">Locations</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/projects"}>
                    <Link to="/projects">Projects</Link>
                </TabNav.Link>
                <TabNav.Link asChild active={pathname === "/inventory"}>
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
            </TabNav.Root>
        </>
    );
};
