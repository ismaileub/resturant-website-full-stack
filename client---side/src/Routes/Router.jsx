import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import OurMenu from "../Pages/Menu/Menu/OurMenu";
import Order from "../Pages/Order/Order/Order";
import Contact from "../Pages/ContactUs/Contact";
import SignUp from "../Pages/SignUp-SignIn/SignUp";
import SignIn from "../Pages/SignUp-SignIn/SingIn";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: 'our-menu',
                element: <OurMenu></OurMenu>
            },
            {
                path: 'order/:category',
                element: <Order></Order>
            },
            {
                path: 'contactUs',
                element: <Contact></Contact>
            },
            {
                path: 'login',
                element: <SignIn></SignIn>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
]);

export default router;