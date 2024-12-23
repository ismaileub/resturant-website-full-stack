import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {

    const navOptions = <>
        <li><NavLink className={({ isActive }) => isActive ? "text-[#EEFF25] font-bold hover:text-white"
            : "  "} to="/">Home</NavLink></li>
        <li><NavLink to="/contactUs">Contact Us</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/menu">Our Menu</NavLink></li>
        <li><NavLink to="/order/salad">Our Shop</NavLink></li>
    </>

    return (
        <div>

            <div className="min-h-[90px] container fixed z-10 bg-black bg-opacity-30 navbar text-white ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                navOptions
                            }

                        </ul>
                    </div>
                    <a className="btn btn-ghost">
                        <div class=" text-left">
                            <h1 class="text-white text-2xl font-extrabold">Food Paradise</h1>
                            <p class="text-white mt-0 text-lg font-semibold tracking-[5px] ">RESTAURANT</p>
                        </div>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navOptions
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;