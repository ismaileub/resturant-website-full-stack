import React, { useState } from 'react';
import featuredImg from '../../assets/home/featured.jpg';
import SectionTitle from '../../Components/Common/SectionTitle';



const FromMenuSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className="relative bg-cover bg-center min-h-[500px]"
            style={{
                backgroundImage: `url(${featuredImg})`,
            }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>



            {/* Content Section */}
            <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">

                <SectionTitle heading={"Check it out"} subHeading={"From Our Menu"} ></SectionTitle>

                {/* Card Section */}
                <div className=" flex gap-10  mx-64 shadow-lg">
                    <div className='w-1/2'>
                        <img
                            src={featuredImg}
                            alt="Delicious Food"
                            className="w-full rounded-lg"
                        />
                    </div>

                    <div className="inset-0 w-1/2 flex flex-col justify-center  text-white p-4">
                        <p className="text-lg">March 20, 2023</p>
                        <h3 className="text-2xl font-bold my-2">
                            WHERE CAN I GET SOME?
                        </h3>

                        {/* Description Section */}
                        <p className="text-base font-medium text-left">
                            {isExpanded
                                ? 'Explore the origins of our unique flavors, crafted to bring you an unforgettable culinary experience. Discover the passion behind our menu, made with fresh ingredients and a touch of creativity. From locally sourced produce to globally inspired dishes, each plate tells a story of care, dedication, and culinary artistry. Join us on a journey that tantalizes your taste buds and nourishes your soul.'
                                : 'Explore the origins of our unique flavors, crafted to bring you an unforgettable culinary experience. Discover the passion behind our menu, made with fresh ingredients and a touch of creativity....'}
                        </p>

                        {/* Button to Toggle "Read More" */}
                        <button
                            onClick={handleReadMore}
                            className="btn btn-outline w-1/3 border-2 border-l-0 border-r-0 border-t-0 border-white text-white hover:bg-gray-400  mt-4"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default FromMenuSection;
