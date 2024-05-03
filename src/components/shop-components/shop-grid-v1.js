import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import ShopDetails from './shop-details';

function ShopGridV1() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bayut.p.rapidapi.com/properties/list', {
          params: {
            locationExternalIDs: '5002,6020',
            purpose: 'for-rent',
            hitsPerPage: '25',
            page: '2',
            lang: 'en',
            sort: 'city-level-score',
            rentFrequency: 'monthly',
            categoryExternalID: '4',
            hasVideo: 'true',
          },
          headers: {
            'X-RapidAPI-Key': '32fd3a9dfamsh549f8b0fd7b9faap1bee35jsn86948ade3195',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
          },
        });
        setProperties(response.data.hits);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="ltn__product-area ltn__product-gutter mb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* ... rest of the ShopGridV1 content remains the same ... */}
            <div className="ltn__product-tab-content-inner ltn__product-grid-view">
              <div className="row">
                {properties.map((property) => (
                  <div className="col-lg-4 col-sm-6 col-12" key={property.id}>
                    <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                      <div className="product-img">
                      <Link
  to={{
    pathname: `/shop-details/${property.id}`,
    state: { propertyData: property }
  }}
>
  <img src={property.coverPhoto.url} alt={property.coverPhoto.title} />
</Link>
  <div className="real-estate-agent">
    <div className="agent-img">
      <Link to="/team-details"><img src={property.ownerAgent.user_image} alt="#" /></Link>
    </div>
  </div>
</div>
<div className="product-info">
  <div className="product-badge">
    <ul>
      <li className="sale-badg">{property.purpose}</li>
    </ul>
  </div>
  <h2 className="product-title go-top"><Link to={`/shop-details/${property.id}`}>{property.title}</Link></h2>
  <h2 className="product-title go-top"><Link to={`/shop-details/${property.id}`}>{property.title_l1}</Link></h2>
  <div className="product-img-location">
    <ul>
      <li className="go-top">
        <Link to="/contact"><i className="flaticon-pin" /> Belmont Gardens, Chicago</Link>
      </li>
    </ul>
  </div>
  <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
    <li><span>{property.rooms} </span> Bedrooms</li>
    <li><span>{property.baths} </span> Bathrooms</li>
    <li><span>{property.area} </span> square Ft</li>
  </ul>
  <div className="product-hover-action">
    <ul>
      <li>
        <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
          <i className="flaticon-expand" />
        </a>
      </li>
      <li>
        <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
          <i className="flaticon-heart-1" />
        </a>
      </li>
      <li>
        <span className="go-top">
          <Link to={`/shop-details/${property.id}`} title="Product Details">
            <i className="flaticon-add" />
          </Link>
        </span>
      </li>
    </ul>
  </div>
</div>
						<div className="product-info-bottom">
							<div className="product-price">
							<span>{property.price}<label>/Month</label></span>
							</div>
						</div>
						</div>
					</div>
					))}
				              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
  );
}

export default ShopGridV1;