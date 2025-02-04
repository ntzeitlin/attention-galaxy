import galaxyImage from "../assets/AttentionGalaxy.jpg";
import SolarSystemView from "../components/solarview/SolarSystemView";
export const HomeView = ({ currentUser }) => {
    // const backgroundStyle = {
    //     backgroundImage: `url(${galaxyImage})`,
    //     backgroundPosition: "center",
    //     height: "80vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     color: "yellow",
    //     textAlign: "center",
    //     fontSize: "18em",
    // };

    // return <div style={backgroundStyle}>Attention Galaxy</div>;

    return <SolarSystemView currentUser={currentUser} />;
};
