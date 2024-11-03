import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ServiceDetails = () => {
  const location = useLocation();
  const { service } = location.state || {};

  let publicUrl = process.env.PUBLIC_URL + '/';

  return (
    <div className="ltn__page-details-area ltn__service-details-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="ltn__page-details-inner ltn__service-details-inner">
              
              <h1>{service ? service.arname : 'اسم الخدمة'}</h1>
              <p>{service ? service.detailed_ar : 'وصف الخدمة هنا. إذا لم يتم العثور على وصف، سيتم عرض هذا النص الافتراضي.'}</p>
              <div className="row">
                
              </div>
              <div className="ltn__service-list-menu text-uppercase mt-50 d-none">
              
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="sidebar-area ltn__right-sidebar">
              <div className="widget-2 ltn__menu-widget ltn__menu-widget-2 text-uppercase">
                <ul className="go-top">
                  <li><Link to="/arservice">العودة إلى صفحة الخدمات <span><i className="fas fa-arrow-right" /></span></Link></li>
                 </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
