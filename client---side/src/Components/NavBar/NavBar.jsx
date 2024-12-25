import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import profile from '../../assets/others/profile.png'

const NavBar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false); // State for toggling menu

    const { user, logOut } = useAuth();

    const navOptions = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#EEFF25] font-bold hover:text-[#EEFF25]"
                            : "text-white hover:text-[#EEFF25]"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contactUs"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#EEFF25] font-bold hover:text-[#EEFF25]"
                            : "text-white hover:text-[#EEFF25]"
                    }
                >
                    Contact Us
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#EEFF25] font-bold hover:text-[#EEFF25]"
                            : "text-white hover:text-[#EEFF25]"
                    }
                >
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/our-menu"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#EEFF25] font-bold hover:text-[#EEFF25]"
                            : "text-white hover:text-[#EEFF25]"
                    }
                >
                    Our Menu
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/order/salad"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#EEFF25] font-bold hover:text-[#EEFF25]"
                            : "text-white hover:text-[#EEFF25]"
                    }
                >
                    Our Shop
                </NavLink>
            </li>
        </>
    );

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }


    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen); // Toggle the menu
    };



    return (
        <div key={location.pathname} className=" inter fixed container mx-auto z-10 text-white">
            <div className="navbar bg-black bg-opacity-30">
                <div className="navbar-start">
                    <a className="btn btn-ghost">
                        <div>
                            <h1 className="text-2xl font-extrabold">Food Paradise</h1>
                            <p className="mt-0 text-lg font-semibold tracking-widest">RESTAURANT</p>
                        </div>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navOptions}</ul>
                </div>
                <div className="navbar-end">

                    {
                        user ? <div className='relative'>
                            <button onClick={handleMenuToggle} className="btn btn-ghost"><img className='h-12 w-12 rounded-full' src={user.photoURL || profile} alt="" />
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div className="absolute text-center right-0 mt-2 w-28 bg-white border rounded-md shadow-lg">
                                    <button
                                        onClick={handleLogOut}
                                        className="block w-full px-2 py-2  text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                            :
                            <div className="flex gap-4">

                                <Link to="/login" className="px-5 py-2 text-white border-2 border-[#BB8506] rounded-md hover:bg-[#dab153] hover:text-white transition">
                                    Sign in
                                </Link>

                                <Link to="/signup" className="px-5 py-2 text-white bg-[#dab153] border-2 border-transparent rounded-md hover:border-[#BB8506] transition hover:bg-transparent">
                                    Sign up
                                </Link>

                            </div>

                    }


                </div>
            </div>
        </div>
    );
};

export default NavBar;
