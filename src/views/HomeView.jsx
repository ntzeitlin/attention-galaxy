import galaxyImage from "../assets/AttentionGalaxy.jpg";
export const HomeView = () => {
    const backgroundStyle = {
        backgroundImage: `url(${galaxyImage})`,
        backgroundPosition: "center",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "yellow",
        textAlign: "center",
        fontSize: "18em",
    };

    return <div style={backgroundStyle}>Attention Galaxy</div>;
};
