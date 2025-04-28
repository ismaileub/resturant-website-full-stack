import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/Common/SectionTitle";
import Swal from "sweetalert2";

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/bookings")
            .then((res) => res.json())
            .then((data) => setBookings(data))
            .catch((err) => console.error("Failed to load bookings:", err));
    }, []);

    console.log(bookings);

    function handleStatusUpdate(id) {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirmed it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "Done" }),
                })
                    .then((res) => res.json())
                    .then((updated) => {
                        if (updated.modifiedCount > 0) {
                            setBookings((prev) =>
                                prev.map((b) =>
                                    b._id === id ? { ...b, status: "Done" } : b
                                )
                            );
                        }
                    })
                    .catch((err) => console.error("Failed to update status:", err));

            }
        });

    }

    return (
        <div className="bg-[#f4f3ef] min-h-screen p-8 text-center">
            <SectionTitle subHeading={'At a Glance!'} heading={'MANAGE ALL BOOKINGS'}></SectionTitle>

            <div className="bg-white rounded-lg  mt-14 shadow-md max-w-6xl mx-auto overflow-x-auto">
                <h3 className="text-left text-xl font-semibold p-4">
                    Total Items: <span className="font-bold">{bookings.length}</span>
                </h3>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-yellow-700 text-white">
                            <th className="px-4 py-3">USER EMAIL</th>
                            <th className="px-4 py-3">PHONE NUMBER</th>
                            <th className="px-4 py-3">BOOKING DATE</th>
                            <th className="px-4 py-3">BOOKING TIME</th>
                            <th className="px-4 py-3">ACTIVITY</th>
                            <th className="px-4 py-3">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking) => (
                            <tr key={booking._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">{booking.email}</td>
                                <td className="px-4 py-3">{booking.phone}</td>
                                <td className="px-4 py-3">{booking.date}</td>
                                <td className="px-4 py-3">{booking.time}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`font-semibold ${booking.status === "Done"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleStatusUpdate(booking._id)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${booking.status === "Done"
                                            ? "bg-green-800 text-white"
                                            : "bg-green-200 text-green-700"
                                            }`}
                                    >
                                        ✓
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Optional: Status update logic

};

export default ManageBookings;
