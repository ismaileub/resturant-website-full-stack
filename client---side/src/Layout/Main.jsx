import React from 'react';
import NavBar from '../Components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
//import Footer from '../Components/NavBar/Footer/Footer';

const Main = () => {


    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Main;