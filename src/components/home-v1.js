// src/components/Home_V1.js
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './global-components/navbar';
import Banner from './section-components/banner';
import Aboutv1 from './section-components/about-v1';
import Footer from './global-components/footer';

const Home_V1 = () => {
    return (
        <div>
            <Navbar />
            
            <Banner />
            <Aboutv1 />
            
            <Footer />
        </div>
    );
}

const styles = {
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '20px 0',
    }
};

export default Home_V1;
