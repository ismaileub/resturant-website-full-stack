import React from "react";
import { SiMinutemailer } from "react-icons/si";



const ContactForm = () => {
    return (
        <div className="max-w-4xl mx-auto my-16 p-8 bg-white shadow-lg rounded-md">
            {/* Title */}
            <h2 className="text-3xl font-semibold text-center mb-8">CONTACT FORM</h2>
            <form>
                {/* Name and Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                        />
                    </div>
                </div>

                {/* Phone Field */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Phone<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Message<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        placeholder="Write your message here"
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    ></textarea>
                </div>

                {/* reCAPTCHA */}
                <div className="mb-6">
                    <div className="flex items-center gap-4">
                        <input type="checkbox" />
                        <p className="text-gray-500">I'm not a robot</p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center w-full">
                    <button
                        type="submit"
                        className="mx-auto px-6 py-3 bg-gradient-to-r from-[#835D23] to-[#B58130]   text-white font-semibold rounded hover:bg-yellow-700 transition flex items-center justify-center gap-2"
                    >
                        Send Message{" "}
                        <span role="img" aria-label="send-icon">
                            <SiMinutemailer size={30} />
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
