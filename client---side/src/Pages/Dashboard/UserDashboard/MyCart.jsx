import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import useAxiosSecure from "../../../components/Hooks/useAxiosSecure";
import useCart from "../../../components/Hooks/useCart";
import SectionTitle from "../../../components/Common/SectionTitle";


const MyCart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }



    return (
        <div className="px-16 pt-10 bg-gray-100 h-full">
            <div className="mb-16">
                <SectionTitle heading={"WANNA ADD MORE?"} subHeading={"My Cart"}  >

                </SectionTitle>
            </div>



            {cart.length === 0 ? (
                <div className="text-center text-red-400 text-xl">Your cart is empty!</div>
            ) : (
                <>
                    <div className="flex justify-evenly mb-8">
                        <h2 className="text-4xl uppercase">Total Orders: {cart.length}</h2>
                        <h2 className="text-4xl uppercase">Total Price: ${totalPrice.toFixed(2)}</h2>
                        <Link to="/dashboard/payment">
                            <button className="btn btn-primary">Pay</button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto bg-white">
                        <table className="table w-full text-base border border-gray-200 rounded-lg">
                            {/* Table Head */}
                            <thead className="bg-yellow-500 text-white">
                                <tr>
                                    <th className="text-center text-lg">#</th>
                                    <th className="text-center text-lg">Item Image</th>
                                    <th className="text-center text-lg">Item Name</th>
                                    <th className="text-center text-lg">Price</th>
                                    <th className="text-center text-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-gray-100">
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">
                                            <div className="avatar flex justify-center items-center">
                                                <div className="mask mask-squircle w-16 h-16">
                                                    <img src={item.image} alt={item.name} className="object-cover" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">{item.name}</td>
                                        <td className="text-center font-bold">${item.price.toFixed(2)}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-outline btn-danger btn-sm mx-auto flex items-center justify-center"
                                            >
                                                <FaTrashAlt className="text-red-600 text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}


        </div>
    );
};

export default MyCart;