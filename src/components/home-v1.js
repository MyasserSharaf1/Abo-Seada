import React from 'react';
import Navbar from './global-components/navbar';
import Banner from './section-components/banner';
import Aboutv1 from './section-components/about-v1';
import Counter from './section-components/counter-v1';
import AboutV2 from './section-components/about-v2';
import Category from './section-components/category-v1';
import Testimonial from './section-components/testimonial-v1';

import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const Home_V1 = () => {
    return <div>
        <Navbar />
        <Banner />
        
        <Aboutv1 />
        
        
        <Footer />
        
    </div>
}

export default Home_V1

