import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>

                {/* Contact Section */}
                <div style={styles.section}>
                    <h3 style={styles.title}>CONTACT US</h3>
                    <p>123 ABS Street, Uni 21, Bangladesh</p>
                    <p>+88 123456789</p>
                    <p>Mon - Fri: 08:00 - 22:00</p>
                    <p>Sat - Sun: 10:00 - 23:00</p>
                </div>

                {/* Social Media Section */}
                <div style={styles.section}>
                    <h3 style={styles.title}>Follow US</h3>
                    <p>Join us on social media</p>
                    <div style={styles.socialIcons}>
                        <a href="https://facebook.com" style={styles.icon}>
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" style={styles.icon}>
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" style={styles.icon}>
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div style={styles.copyright}>
                <p>Copyright © Food Paradise. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#1d2431',
        color: '#ffffff',
        textAlign: 'center',
        padding: '20px 0',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    section: {
        flex: 1,
        textAlign: 'center',
    },
    title: {
        fontSize: '18px',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    icon: {
        fontSize: '20px',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '8px',
        backgroundColor: '#343a40',
        borderRadius: '50%',
    },
    copyright: {
        marginTop: '20px',
        fontSize: '14px',
        backgroundColor: '#000000',
        padding: '10px 0',
    },
};

export default Footer;
