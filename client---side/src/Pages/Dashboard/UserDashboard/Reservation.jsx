import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import SectionTitle from "../../../components/Common/SectionTitle";

const Reservation = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const reservationData = {
            date: form.date.value,
            time: form.time.value,
            people: form.people.value,
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            status: "Pending",
        };

        try {
            const res = await fetch("http://localhost:5000/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Reservation submitted successfully!");
                form.reset(); // reset form
            } else {
                toast.error(data.message || "Failed to submit.");
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="p-8 bg-white min-h-screen text-gray-800">
            <Toaster />
            <div className="text-center mb-8">
                <p className="text-yellow-600 italic">---Reservation---</p>
                <h2 className="text-3xl font-bold">BOOK A TABLE</h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
            >
                {/* Date */}
                <div>
                    <label htmlFor="date" className="block text-sm font-semibold mb-1">Date*</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Time */}
                <div className="relative">
                    <label htmlFor="time" className="block text-sm font-semibold mb-1">Time*</label>
                    <div className="relative">
                        <input
                            type="time"
                            id="time"
                            name="time"
                            className="border p-2 pl-10 rounded w-full"
                            required
                        />
                        <FaClock className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {/* People */}
                <div>
                    <label htmlFor="people" className="block text-sm font-semibold mb-1">Number of People*</label>
                    <select
                        id="people"
                        name="people"
                        className="border p-2 rounded w-full"
                        required
                    >
                        <option>1 Person</option>
                        <option>2 People</option>
                        <option>3 People</option>
                        <option>4+ People</option>
                    </select>
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-1">Your Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-1">Phone Number*</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">Email*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Submit */}
                <div className="col-span-1 md:col-span-3 flex justify-center">
                    <button
                        type="submit"
                        className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-6 rounded"
                    >
                        Book A Table
                    </button>
                </div>
            </form>

            <div className="text-center mb-8">
                <SectionTitle subHeading={'Visit Us'} heading={'OUR LOCATION'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-4xl mx-auto">
                <div className="bg-yellow-700 text-white p-6 rounded shadow">
                    <FaPhoneAlt size={24} className="mx-auto mb-2" />
                    <h3 className="font-bold">PHONE</h3>
                    <p>+38 (012) 34 56 789</p>
                </div>
                <div className="bg-yellow-700 text-white p-6 rounded shadow">
                    <FaMapMarkerAlt size={24} className="mx-auto mb-2" />
                    <h3 className="font-bold">ADDRESS</h3>
                    <p>123 Street, City, Country</p>
                </div>
                <div className="bg-yellow-700 text-white p-6 rounded shadow">
                    <FaClock size={24} className="mx-auto mb-2" />
                    <h3 className="font-bold">WORKING HOURS</h3>
                    <p>Mon - Fri: 08:00 - 22:00</p>
                    <p>Sat - Sun: 10:00 - 23:00</p>
                </div>
            </div>
        </div>
    );
};

export default Reservation;
