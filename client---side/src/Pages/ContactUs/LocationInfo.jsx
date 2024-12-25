import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa'; // Import icons from React Icons
import SectionTitle from '../../Components/Common/SectionTitle';

const LocationInfo = () => {
    const data = [
        {
            id: 1,
            icon: <FaPhoneAlt className="text-4xl" />, // Phone Icon
            title: 'PHONE',
            description: '+38 (012) 34 56 789',
        },
        {
            id: 2,
            icon: <FaMapMarkerAlt className="text-4xl" />, // Location Icon
            title: 'ADDRESS',
            description: '+38 (012) 34 56 789',
        },
        {
            id: 3,
            icon: <FaClock className="text-4xl" />, // Clock Icon
            title: 'WORKING HOURS',
            description: 'Mon - Fri: 08:00 - 22:00\nSat - Sun: 10:00 - 23:00',
        },
    ];

    return (
        <div className="text-center my-16 lg:mx-20 2xl:mx-64">
            {/* Title Section */}
            <SectionTitle heading="OUR LOCATION" subHeading="Visit Us"></SectionTitle>
            {/* Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-20">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="shadow-lg rounded-lg border border-gray-200 overflow-hidden"
                    >
                        {/* Icon Header */}
                        <div className="bg-yellow-600 text-white flex items-center justify-center py-4">
                            {item.icon}
                        </div>
                        {/* Content */}
                        <div className="bg-gray-100 text-center p-6">
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationInfo;
