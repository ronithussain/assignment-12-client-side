import DisplayAnnouncement from "../Dashboard/AdminRoutes/DisplayAnnouncement";
import AnnounceMent from "./AnnounceMent";
import Banner from "./Banner";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <DisplayAnnouncement></DisplayAnnouncement>
            <AnnounceMent></AnnounceMent>
        </div>
    );
};

export default Home;