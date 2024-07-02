import React, { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc,getDoc,setDoc, doc ,Timestamp} from 'firebase/firestore';

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

const auth = getAuth(app);

class AddListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isAgency: false,
      agencyId: '',
      userId: '',
      formValues: {
        title: '',
        description: '',
        price: '',
        afterPriceLabel: '',
        beforePriceLabel: '',
        taxRate: '',
        hoaFee: '',
        category: '',
        status: '',
        media: null,
        videoSource: '',
        videoId: '',
        virtualTour: '',
        address: '',
        country: '',
        state: '',
        city: '',
        neighborhood: '',
        zip: '',
        latitude: '',
        longitude: '',
        size: '',
        lotSize: '',
        rooms: '',
        bedrooms: '',
        bathrooms: '',
        customId: '',
        garages: '',
        yearBuilt: '',
        garageSize: '',
        availableFrom: '',
        basement: '',
        extraDetails: '',
        roofing: '',
        exteriorMaterial: '',
        structureType: '',
        floors: '',
        energyClass: '',
        energyIndex: '',
        amenities: []
      }
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formValues: {
        ...prevState.formValues,
        [name]: value
      }
    }));
  };

  handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    this.setState((prevState) => ({
      formValues: {
        ...prevState.formValues,
        amenities: checked
          ? [...prevState.formValues.amenities, name]
          : prevState.formValues.amenities.filter((amenity) => amenity !== name)
      }
    }));
  };

  handleRadioChange = (e) => {
    const { value } = e.target;
    this.setState({ isAgency: value === 'agency' });
  };

  handleAgencyIdChange = (e) => {
    this.setState({ agencyId: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isAgency, agencyId, formValues } = this.state;
  
    if (isAgency) {
      try {
        const agencyDoc = await getDoc(doc(db, 'Agencies', agencyId));
        if (agencyDoc.exists()) {
          await addDoc(collection(db, 'Agencies', agencyId, 'Properties'), {
            ...formValues,
            agency: agencyId,
            addedAt: Timestamp.now() // Ensure to include a timestamp
          });
          console.log('Property added to agency Properties collection');
        } else {
          alert('Invalid agency ID');
        }
      } catch (error) {
        console.error('Error adding property:', error);
      }
    } else {
      const user = auth.currentUser;
      const uid = user.uid;
      if (user) {
        try {
          const userRef = doc(db, 'User', uid);
          const userDoc = await getDoc(userRef);
  
          if (!userDoc.exists()) {
            // If the user document does not exist, create it
            await setDoc(userRef, {});
          }
          const userprop = collection(userRef, 'my_Properties');
  
          await addDoc(userprop, {
            ...formValues,
            userId: user.uid,
            addedAt: Timestamp.now() // Ensure to include a timestamp
          });
          alert('Property added to user my_properties collection');
        } catch (error) {
          console.error('Error adding property:', error);
        }
      } else {
        alert('Please log in first');
      }
    }
  };
  
  render() {
    const { formValues, isAgency } = this.state;


    return (
      <div className="ltn__appointment-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__appointment-inner">
                <form onSubmit={this.handleSubmit}>
                  <h2>1. Description</h2>
                  <p><small>These fields are mandatory: Title, Property Media</small></p>
                  <h6>Property Description</h6>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="title" placeholder="*Title (mandatory)" onChange={this.handleInputChange} value={formValues.title} />
                      </div>
                      <div className="input-item input-item-textarea ltn__custom-icon">
                        <textarea name="description" placeholder="Description" onChange={this.handleInputChange} value={formValues.description} />
                      </div>
                    </div>
                  </div>
                  <h6>Property Price</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="price" placeholder="Price in $ (only numbers)" onChange={this.handleInputChange} value={formValues.price} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="afterPriceLabel" placeholder="After Price Label (ex: /month)" onChange={this.handleInputChange} value={formValues.afterPriceLabel} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="beforePriceLabel" placeholder="Before Price Label (ex: from)" onChange={this.handleInputChange} value={formValues.beforePriceLabel} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="taxRate" placeholder="Yearly Tax Rate" onChange={this.handleInputChange} value={formValues.taxRate} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="hoaFee" placeholder="Homeowners Association Fee(monthly)" onChange={this.handleInputChange} value={formValues.hoaFee} />
                      </div>
                    </div>
                  </div>
                  <h6>Select Categories</h6>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="input-item">
                        <select className="nice-select" name="category" onChange={this.handleInputChange} value={formValues.category}>
                          <option value="">None</option>
                          <option value="Apartments">Apartments</option>
                          <option value="Condos">Condos</option>
                          <option value="Duplexes">Duplexes</option>
                          <option value="Houses">Houses</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Land">Land</option>
                          <option value="Offices">Offices</option>
                          <option value="Retail">Retail</option>
                          <option value="Villas">Villas</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="input-item">
                        <select className="nice-select" name="status" onChange={this.handleInputChange} value={formValues.status}>
                          <option value="">no status</option>
                          <option value="Active">Active</option>
                          <option value="hot offer">hot offer</option>
                          <option value="new offer">new offer</option>
                          <option value="open house">open house</option>
                          <option value="sold">sold</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h2>2. Media</h2>
                  <h6>Listing Media</h6>
                  <input type="file" id="myFile" name="media" className="btn theme-btn-3 mb-10" onChange={this.handleFileChange} /><br />
                  <p>
                    <small>* At least 1 image is required for a valid submission.Minimum size is 500/500px.</small><br />
                    <small>* PDF files upload supported as well.</small><br />
                    <small>* Images might take longer to be processed.</small>
                  </p>
                  <h6>Video Option</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item">
                        <select className="nice-select" name="videoSource" onChange={this.handleInputChange} value={formValues.videoSource}>
                          <option>Video from</option>
                          <option value="vimeo">vimeo</option>
                          <option value="youtube">youtube</option>
                          <option value="own">own</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="videoId" placeholder="Video ID: https://www.youtube.com/watch?v=VIDEO_ID" onChange={this.handleInputChange} value={formValues.videoId} />
                      </div>
                    </div>
                  </div>
                  <h6>Virtual Tour</h6>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea name="virtualTour" placeholder="Virtual Tour: Enter Full virtual tour (e.g. iframe)" onChange={this.handleInputChange} value={formValues.virtualTour} />
                  </div>
                  <h2>3. Location</h2>
                  <h6>Listing Location</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="address" placeholder="*Address" onChange={this.handleInputChange} value={formValues.address} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="country" placeholder="Country" onChange={this.handleInputChange} value={formValues.country} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="state" placeholder="State" onChange={this.handleInputChange} value={formValues.state} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="city" placeholder="City" onChange={this.handleInputChange} value={formValues.city} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="neighborhood" placeholder="Neighborhood" onChange={this.handleInputChange} value={formValues.neighborhood} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="zip" placeholder="Zip" onChange={this.handleInputChange} value={formValues.zip} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="latitude" placeholder="Latitude (for Google Maps)" onChange={this.handleInputChange} value={formValues.latitude} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="longitude" placeholder="Longitude (for Google Maps)" onChange={this.handleInputChange} value={formValues.longitude} />
                      </div>
                    </div>
                  </div>
                  <h2>4. Details</h2>
                  <h6>Listing Details</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="size" placeholder="Size in ft2 (*only numbers)" onChange={this.handleInputChange} value={formValues.size} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="lotSize" placeholder="Lot Size in ft2 (*only numbers)" onChange={this.handleInputChange} value={formValues.lotSize} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="rooms" placeholder="Rooms (*only numbers)" onChange={this.handleInputChange} value={formValues.rooms} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="bedrooms" placeholder="Bedrooms (*only numbers)" onChange={this.handleInputChange} value={formValues.bedrooms} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="bathrooms" placeholder="Bathrooms (*only numbers)" onChange={this.handleInputChange} value={formValues.bathrooms} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="customId" placeholder="Custom ID (*text)" onChange={this.handleInputChange} value={formValues.customId} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="garages" placeholder="Garages (*text)" onChange={this.handleInputChange} value={formValues.garages} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="yearBuilt" placeholder="Year Built (*only numbers)" onChange={this.handleInputChange} value={formValues.yearBuilt} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="garageSize" placeholder="Garage Size (*text)" onChange={this.handleInputChange} value={formValues.garageSize} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="availableFrom" placeholder="Available From (*date)" onChange={this.handleInputChange} value={formValues.availableFrom} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="basement" placeholder="Basement (*text)" onChange={this.handleInputChange} value={formValues.basement} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="extraDetails" placeholder="Extra Details (*text)" onChange={this.handleInputChange} value={formValues.extraDetails} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="roofing" placeholder="Roofing (*text)" onChange={this.handleInputChange} value={formValues.roofing} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="exteriorMaterial" placeholder="Exterior Material (*text)" onChange={this.handleInputChange} value={formValues.exteriorMaterial} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="structureType" placeholder="Structure Type (*text)" onChange={this.handleInputChange} value={formValues.structureType} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="floors" placeholder="Floors No (*text)" onChange={this.handleInputChange} value={formValues.floors} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="energyClass" placeholder="Energy Class (*text)" onChange={this.handleInputChange} value={formValues.energyClass} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="energyIndex" placeholder="Energy Index (*text)" onChange={this.handleInputChange} value={formValues.energyIndex} />
                      </div>
                    </div>
                  </div>
                  <h2>5. Amenities</h2>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="property-details-amenities mb-60">
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="airCondition" name="airCondition" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Air Conditioning</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="barbeque" name="barbeque" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Barbeque</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="dryer" name="dryer" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Dryer</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="gym" name="gym" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Gym</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="laundry" name="laundry" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Laundry</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="lawn" name="lawn" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Lawn</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="microwave" name="microwave" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Microwave</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="outdoorShower" name="outdoorShower" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Outdoor Shower</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="refrigerator" name="refrigerator" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Refrigerator</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="sauna" name="sauna" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Sauna</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="swimmingPool" name="swimmingPool" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Swimming Pool</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="tvCable" name="tvCable" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>TV Cable</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="washer" name="washer" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>Washer</h4>
                            </div>
                          </div>
                        </div>
                        <div className="ltn__feature-item">
                          <div className="ltn__feature-icon-title">
                            <div className="ltn__feature-icon">
                              <input type="checkbox" id="wifi" name="wifi" onChange={this.handleCheckboxChange} />
                            </div>
                            <div className="ltn__feature-info">
                              <h4>WiFi</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2>6. Type of User</h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="input-item">
                        <label>
                          <input type="radio" name="userType" value="agency" onChange={this.handleRadioChange} />
                          Agency
                        </label>
                      </div>
                      {isAgency && (
                        <div className="input-item">
                          <input type="text" name="agencyId" placeholder="Agency ID" onChange={this.handleAgencyIdChange} />
                        </div>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-item">
                        <label>
                          <input type="radio" name="userType" value="user" onChange={this.handleRadioChange} />
                          Normal User
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="btn-wrapper text-center mt-30">
                    <button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase">Submit Property</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddListing;
