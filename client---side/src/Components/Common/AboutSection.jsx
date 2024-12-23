import React from 'react';
import img from '../../assets/home/chef-service.jpg';

const AboutSection = ({ title, description }) => {
    return (
        <section
            className="relative bg-cover bg-center py-20 my-20"
            style={{ backgroundImage: `url(${img})` }}
        >
            <div className="bg-white bg-opacity-90 mx-auto max-w-4xl p-10 rounded-lg shadow-lg text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
                <p className="text-lg text-gray-600">
                    {description}
                </p>
            </div>
        </section>
    );
};

export default AboutSection;
