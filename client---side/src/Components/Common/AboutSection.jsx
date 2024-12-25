import React from 'react';
import img from '../../assets/home/chef-service.jpg';

const AboutSection = ({ title, description, image }) => {
    return (
        <section
            className="relative bg-cover bg-center py-20 my-10"
            style={{ backgroundImage: `url(${image || img})` }}
        >
            <div className="bg-[#15151599] bg-opacity-60  mx-auto max-w-4xl p-10 rounded-lg shadow-lg text-center">
                <h2 className="text-4xl cinzel font-bold text-white mb-4 uppercase">{title}</h2>
                <p className="text-base text-white inter">
                    {description}
                </p>
            </div>
        </section>
    );
};

export default AboutSection;
