import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import OurMenu from "../Pages/Menu/Menu/OurMenu";
import Order from "../Pages/Order/Order/Order";
import Contact from "../Pages/ContactUs/Contact";
import SignUp from "../Pages/SignUp-SignIn/SignUp";
import SignIn from "../Pages/SignUp-SignIn/SingIn";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard_Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserDashboard/UserHome";
import MyCart from "../Pages/Dashboard/UserDashboard/MyCart";
import ErrorPage from "../Components/Errorpage/ErrorPage";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/Dashboard/AdminDashboard/AddItems";
import ManageItems from "../Pages/Dashboard/AdminDashboard/ManageItems";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome";
import UpdateItem from "../Pages/Dashboard/AdminDashboard/UpdateItem";
import Payment from "../Pages/Dashboard/UserDashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/UserDashboard/PaymentHistory/PaymentHistory";
import AddReview from "../Pages/Dashboard/UserDashboard/AddReview";
import Reservation from "../Pages/Dashboard/UserDashboard/Reservation";
import ManageBookings from "../Pages/Dashboard/AdminDashboard/ManageBookings ";





const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
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
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            //normal user routes
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'cart',
                element: <MyCart></MyCart>
            },
            {
                path: "review",
                element: <AddReview></AddReview>
            },
            {
                path: "reservation",
                element: <Reservation></Reservation>
            },

            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },


            //admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: 'bookings',
                element: <ManageBookings></ManageBookings>
            },
            ,
            {
                path: 'updateItem/:id',
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            }

        ]
    }
]);

export default router;