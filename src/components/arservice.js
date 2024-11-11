import React from 'react';
import Navbar from './global-components/arnavbar';
import PageHeader from './global-components/arbage-header';
import AboutV5 from './section-components/arabout-v5';
import ServiceV1 from './section-components/arservice-v1';
import CallToActionV1 from './section-components/arcall-to-action-v1';
import Footer from './global-components/arfooter';

const Service_V1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="ماذا نقدم" subheader="خدماتنا" />
        <AboutV5 />
        <ServiceV1 />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Service_V1

