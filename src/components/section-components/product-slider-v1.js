import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBu4EgPTNk8ZW3VwJ3p7_J42O0coyrRIyM",
	authDomain: "askundb.firebaseapp.com",
	projectId: "askundb",
	storageBucket: "askundb.appspot.com",
	messagingSenderId: "873898080051",
	appId: "1:873898080051:web:0c24b0114fcd9f4d1c3046"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class ProductSliderV1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasedProperties: [],
      isLoading: true,
      error: null,
      selectedProperty: null, // Store selected property for modals
    };
  }

  async componentDidMount() {
    try {
      const q = query(collection(db, 'PurchasedProperties'), orderBy('createdAt', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const purchasedProperties = querySnapshot.docs.map(doc => doc.data());
        this.setState({ purchasedProperties, isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching purchased properties:', error);
      this.setState({ error, isLoading: false });
    }
  }

  handleQuickView(property) {
    this.setState({ selectedProperty: property });
    // Optionally, you can open the modal programmatically here
  }

  handleAddToWishlist(property) {
    this.setState({ selectedProperty: property });
    // Optionally, you can open the modal programmatically here
  }

  handleAddToCart(property) {
    this.setState({ selectedProperty: property });
    // Optionally, you can open the modal programmatically here
  }

  render() {
    const { purchasedProperties, isLoading, error, selectedProperty } = this.state;
    let publicUrl = process.env.PUBLIC_URL + '/';

    return (
      <div>
        {/* Product Slider */}
        <div className="ltn__product-slider-area">
          <div className="container-fluid">
            <div className="row">
			<div className="section-title-area ltn__section-title-2--- text-center">
		          <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Properties</h6>
		          <h1 className="section-title">Featured Listings</h1>
		        </div>
              {/* Render properties */}
              {isLoading ? (
                <p>Loading purchased properties...</p>
              ) : error ? (
                <p>Error fetching purchased properties: {error.message}</p>
              ) : purchasedProperties.length === 0 ? (
                <p>No purchased properties available.</p>
              ) : (
				
                purchasedProperties.map((property, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-sm-6">
                    {/* Product item */}
                    <div className="ltn__product-item">
                      <div className="product-img">
                        <Link to={`/product-details/${property.id}`}>
                          <img src={property.coverPhoto.url} alt="#" />
                        </Link>
                      </div>
                      <div className="product-info">
                        <span className="badge">{property.status}</span>
                        <h2 className="product-title">
                          <Link to={`/product-details/${property.id}`}>{property.title}</Link>
                        </h2>
                        <div className="product-price">
                          <span>{property.price}<label>/{property.priceLabel}</label></span>
                        </div>
                        <ul className="product-specification">
                          <li>{property.bedrooms} Bedrooms</li>
                          <li>{property.bathrooms} Bathrooms</li>
                          <li>{property.area} sq ft</li>
                        </ul>
                      </div>
                      <div className="product-action">
                        <ul>
                          <li>
                            <a href="#" onClick={() => this.handleQuickView(property)}>
                              <i className="fa fa-eye"></i> Quick View
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={() => this.handleAddToWishlist(property)}>
                              <i className="fa fa-heart"></i> Add to Wishlist
                            </a>
                          </li>
                          <li>
                            <a href="#" onClick={() => this.handleAddToCart(property)}>
                              <i className="fa fa-shopping-cart"></i> Add to Cart
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <div className="modal fade" id="quick_view_modal" tabIndex={-1}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="product-details">
                  {selectedProperty && (
                    <>
                      <h2>{selectedProperty.title}</h2>
                      <img src={selectedProperty.coverPhoto.url} alt={selectedProperty.title} />
                      <p>{selectedProperty.description}</p>
                      <p>Price: {selectedProperty.price}</p>
                      {/* Add more details as needed */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Modal */}
        <div className="modal fade" id="liton_wishlist_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="product-details">
                  {selectedProperty && (
                    <>
                      <h2>{selectedProperty.title}</h2>
                      <img src={selectedProperty.coverPhoto.url} alt={selectedProperty.title} />
                      <p>Successfully added to your Wishlist.</p>
                      {/* Add more details as needed */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Modal */}
        <div className="modal fade" id="add_to_cart_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="product-details">
                  {selectedProperty && (
                    <>
                      <h2>{selectedProperty.title}</h2>
                      <img src={selectedProperty.coverPhoto.url} alt={selectedProperty.title} />
                      <p>Successfully added to your Cart.</p>
                      {/* Add more details as needed */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSliderV1;
