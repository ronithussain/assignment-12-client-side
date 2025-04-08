import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";


const MainLayout = () => {
    return (
        <div >
            <div className="">
            <Navbar></Navbar>
            </div>
            <main className='min-h-[calc(100vh-320px)] '>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;