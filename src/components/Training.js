import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ContactForm from './section-components/Trainee';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const ContactV1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Apply for job" subheader="Training" />
        
        <ContactForm />
        
        <CallToActionV1 />
        <Footer />
    </div>
}

export default ContactV1

