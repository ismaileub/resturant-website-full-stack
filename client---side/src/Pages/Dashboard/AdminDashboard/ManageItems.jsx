import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/Common/SectionTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useMenu from "../../../Components/Hooks/useMenu";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    return (
        <div className="px-8 py-6">
            <SectionTitle heading="Manage All Items" subHeading="Hurry up"></SectionTitle>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-xl font-bold mb-4">Total Items: {menu.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-200">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-yellow-600 text-white text-left">
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Item Image</th>
                                <th className="py-3 px-4">Item Name</th>
                                <th className="py-3 px-4">Price</th>
                                <th className="py-3 px-4 text-center">Action</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {menu.map((item, index) => (
                                <tr key={item._id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-4 font-semibold">{index + 1}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 border rounded-md overflow-hidden">
                                                <img
                                                    src={item.image || "https://via.placeholder.com/50"}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{item.name}</td>
                                    <td className="py-3 px-4 font-semibold">${item.price.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-center">
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="btn bg-orange-500 text-white px-3 py-2 rounded-md">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn bg-red-600 text-white px-3 py-2 rounded-md"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;
