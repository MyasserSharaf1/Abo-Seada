import React from 'react';
import Navbar from './global-components/arnavbar';
import PageHeader from './global-components/page-header';
import AboutV4 from './section-components/arabout-v5';
import ServiceV1 from './section-components/arservice-v1';

import Testimonial from './section-components/testimonial';
import CallToActionV1 from './section-components/arcall-to-action-v1';
import Footer from './global-components/arfooter';


const About_v1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="عن المكتب" />
        <AboutV4 />
        <ServiceV1 />        <Testimonial />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default About_v1

