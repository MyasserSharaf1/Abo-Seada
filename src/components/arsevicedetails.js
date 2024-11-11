import React from 'react';
import Navbar from './global-components/arnavbar';
import PageHeader from './global-components/arbage-header';
import ServiceDetails from './section-components/arservicedetails';
import CallToActionV1 from './section-components/arcall-to-action-v1';
import Footer from './global-components/arfooter';

const Service_Details = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="تفاصيل الخدمة"  />
        <ServiceDetails />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Service_Details

