import React from 'react';
import { useLocation } from 'react-router-dom';

function ShopDetails() {
  const location = useLocation();
  const { propertyData } = location.state;

  return (
    <div className="ltn__shop-details-area pb-10">
    <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-12">
      <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
      <div className="ltn__blog-meta">
      <div className="ltn__property-details-gallery mb-30">
						<div className="row">
							<div className="col-md-6">
							<a data-rel="lightcase:myCollection">
								<img className="mb-30" src={propertyData.coverPhoto?.url} alt="Image" />
							</a>
							</div>
						</div>
						</div>
      <label><span className="ltn__secondary-color"><i className="flaticon-pin" /></span> Belmont Gardens, Chicago</label>
						<h4 className="title-2">Description</h4>
						<p>{propertyData.Description}</p>
            <div className="property-detail-info-list section-bg-1 clearfix mb-60">                          
						<ul>
							<li><label>Property ID:</label> <span>{propertyData.id}</span></li>
							<li><label>Home Area: </label> <span>{propertyData.area}</span></li>
							<li><label>Rooms:</label> <span>{propertyData.rooms}</span></li>
							<li><label>Baths:</label> <span>{propertyData.baths}</span></li>
              <li><label>Property Status:</label> <span>{propertyData.purpose}</span></li>
							<li><label>Year built:</label> <span>{propertyData.agency?.createdAt}</span></li>
              <li><label>Price:</label><span>{propertyData.price}<label>USD</label></span></li>

						</ul>
            </div>
            <h4 className="title-2 mb-10">Amenities</h4>
						<div className="property-details-amenities mb-60">
						<div className="row">
							<div className="col-lg-4 col-md-6">
							<div className="ltn__menu-widget">
              <ul>
                        {propertyData.amenities?.map((amenity, index) => (
                          <li key={index}>
                            <label className="checkbox-item">{amenity}</label>
                          </li>
                        ))}
                      </ul>
							</div>
							</div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
  );
}

export default ShopDetails;
