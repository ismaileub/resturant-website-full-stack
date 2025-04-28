import React from 'react';
import Banner from './Banner';
import Category from './Category';
import AboutSection from '../../components/Common/AboutSection';
import Menu from './Menu';
import FromMenuSection from './FromMenuSection';
import Testimonials from './Testimonials';


const Home = () => {
    return (
        <div>

            <Banner></Banner>

            <section className='mx-64'>
                <Category></Category>
                <AboutSection
                    title="Food Heaven"
                    description="  Welcome to Food Heaven, where every bite takes you on a journey of flavors.
                    From farm-fresh ingredients to culinary masterpieces, we believe in making
                    food an experience to remember. Join us to indulge in dishes crafted with
                    love and passion, perfect for every occasion."
                >

                </AboutSection>
                <Menu></Menu>
                <div className="bg-black text-white py-16 my-16 text-center">
                    <p className="text-lg font-semibold">Call Us: +88 0192345678910</p>
                </div>

            </section>

            <FromMenuSection>

            </FromMenuSection>

            <Testimonials></Testimonials>

        </div>
    );
};

export default Home;