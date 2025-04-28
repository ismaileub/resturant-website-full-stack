import { FaUtensils, FaShoppingBag, FaPhoneAlt, FaShoppingCart, FaStar, FaCalendar, FaWallet } from "react-icons/fa"; // Importing icons
import useAuth from "../../../components/Hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();
    //console.log(user.photoURL);
    return (
        <div className="p-6 bg-gray-50 full">
            {/* Welcome Message */}
            <h2 className="text-3xl font-semibold mb-6">
                Hi, Welcome{" "}
                <span className="font-bold">
                    {user?.displayName ? user.displayName : "Back"}
                </span>!
            </h2>

            {/* Top Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="text-4xl font-bold">205</h3>
                        <p className="text-lg">Menu</p>
                    </div>
                    <FaUtensils className="text-5xl" />
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="text-4xl font-bold">103</h3>
                        <p className="text-lg">Shop</p>
                    </div>
                    <FaShoppingBag className="text-5xl" />
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="text-4xl font-bold">03</h3>
                        <p className="text-lg">Contact</p>
                    </div>
                    <FaPhoneAlt className="text-5xl" />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-4">
                {/* User Information */}
                <div className="bg-yellow-100 p-6 rounded-lg flex flex-col items-center justify-center shadow-md">
                    <div className="w-28 h-28 rounded-full mb-4">
                        <img className="w-28 h-28 rounded-full" src={user?.photoURL} alt="" />
                    </div>
                    <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                </div>

                {/* Activities */}
                <div className="bg-yellow-200 p-12 rounded-lg shadow-md">
                    <h3 className="text-3xl uppercase font-semibold mb-4">Your Activities</h3>
                    <ul className="space-y-2">
                        <li className="flex text-xl items-center text-blue-600">
                            <FaShoppingCart className="mr-2" />
                            Orders: <span className="ml-2 text-black">6</span>
                        </li>
                        <li className="flex text-xl items-center text-[#00C4A1]">
                            <FaStar className="mr-2" />
                            Reviews: <span className="ml-2 text-black">2</span>
                        </li>
                        <li className="flex text-xl items-center text-orange-500">
                            <FaCalendar className="mr-2" />
                            Bookings: <span className="ml-2 text-black">1</span>
                        </li>
                        <li className="flex text-xl items-center text-pink-500">
                            <FaWallet className="mr-2" />
                            Payment: <span className="ml-2 text-black">3</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
