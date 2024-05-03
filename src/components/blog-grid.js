import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ShopGridV1 from './shop-components/shop-grid-v1'; // Import ShopGridV1 component
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const BlogGridPage = () => {
    return (
        <div>
            <Navbar />
            <PageHeader headertitle="Blog Grid" />
            <ShopGridV1 /> {/* Use ShopGridV1 component */}
            <CallToActionV1 />
            <Footer />
        </div>
    );
}

export default BlogGridPage;
