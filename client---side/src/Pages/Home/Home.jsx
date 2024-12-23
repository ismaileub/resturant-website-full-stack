import React from 'react';
import Banner from './Banner';
import Category from './Category';
import AboutSection from '../../Components/Common/AboutSection';
import Menu from './Menu';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
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

        </div>
    );
};

export default Home;