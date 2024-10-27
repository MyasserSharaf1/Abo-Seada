// src/components/Home_V1.js
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './global-components/arnavbar';
import Banner from './section-components/arbanner';
import Aboutv1 from './section-components/arabout-v1';
import Footer from './global-components/arfooter';

const Home_V1 = () => {
    return (
        <div>
            <Navbar />
            <Link
                            to="/"
                            className="btn btn-transparent btn-effect-3"
                          >
                            translate to english
                          </Link>
            <Banner />
            <Aboutv1 />
            
            <Footer />
        </div>
    );
}


export default Home_V1;
