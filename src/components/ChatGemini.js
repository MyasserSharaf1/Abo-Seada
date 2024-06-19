import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import ChatGem from './shop-components/Chat';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const ChatGemPage = () => {
    return (
      <div>
        
        <PageHeader headertitle="Ask Askun" />
        <ChatGem />
        <CallToActionV1 />
        <Footer />
      </div>
    );
  };
  
  export default ChatGemPage;
