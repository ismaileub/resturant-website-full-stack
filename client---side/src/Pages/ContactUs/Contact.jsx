import React from 'react';
import Cover from '../../Components/Common/Cover';
import contactImg from '../../assets/contact/banner.jpg'
import LocationInfo from './LocationInfo';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <div>
            <Cover img={contactImg} title="Order Food"></Cover>
            <LocationInfo></LocationInfo>
            <ContactForm></ContactForm>
        </div>
    );
};

export default Contact;