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
              <div className="ltn__blog-img">
                <img src={publicUrl + "assets/img/service/21.jpg"} alt="Image" />
              </div>
              <h1>{service ? service.name : 'Service Name'}</h1>
              <p>{service ? service.description : 'Service description goes here. If no description is found, this default text will be displayed.'}</p>
              <div className="row">
                
              </div>
              <div className="ltn__service-list-menu text-uppercase mt-50 d-none">
              
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="sidebar-area ltn__right-sidebar">
              {/* Menu Widget */}
              <div className="widget-2 ltn__menu-widget ltn__menu-widget-2 text-uppercase">
                <ul className="go-top">
                  <li><Link to="/service">Back to Services Page <span><i className="fas fa-arrow-right" /></span></Link></li>
                 </ul>
              </div>
              {/* Banner Widget */}
             
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
