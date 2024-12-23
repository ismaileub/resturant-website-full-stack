import React from 'react';
import SectionTitle from '../../Components/Common/SectionTitle';
import Marquee from "react-fast-marquee";
import slide1 from '../../assets/home/slide1.jpg';
import slide2 from '../../assets/home/slide2.jpg';
import slide3 from '../../assets/home/slide3.jpg';
import slide4 from '../../assets/home/slide4.jpg';
import slide5 from '../../assets/home/slide5.jpg';
import slide6 from '../../assets/home/slide1.jpg';
import slide7 from '../../assets/home/slide2.jpg';
import slide8 from '../../assets/home/slide3.jpg';
import slide9 from '../../assets/home/slide4.jpg';
import slide10 from '../../assets/home/slide5.jpg';


const Category = () => {

    const items = [
        { img: slide1, name: "Salad" },
        { img: slide2, name: "Pizza" },
        { img: slide3, name: "Dessert" },
        { img: slide4, name: "Burger" },
        { img: slide5, name: "Pasta" },
        { img: slide6, name: "Fries" },
        { img: slide7, name: "Sushi" },
        { img: slide8, name: "Tacos" },
        { img: slide9, name: "Ice Cream" },
        { img: slide10, name: "Steak" }
    ];



    return (
        <section className='mt-10 mb-20'>
            <SectionTitle
                subHeading={"From 11.00am to 10.00pm"}
                heading={"Order Online"}
            ></SectionTitle>



            <div className='mx-64' >
                <Marquee speed={30} pauseOnHover={true} >


                    {
                        items.map((item, index) => (
                            <div key={index} className="text-center relative">
                                <img className="w-full" src={item.img} alt={item.name} />

                                <h3 className="text-4xl uppercase absolute inset-x-0 bottom-4 text-center text-white">
                                    {item.name}
                                </h3>

                            </div>
                        ))
                    }

                </Marquee>
            </div>





        </section>
    );
};

export default Category;