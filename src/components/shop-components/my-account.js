import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged ,signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsicCTmMLWPMSyHxOfMnr_SVQ8m-rCoUM",
  authDomain: "abu-seada-office.firebaseapp.com",
  projectId: "abu-seada-office",
  storageBucket: "abu-seada-office.appspot.com",
  messagingSenderId: "567437272231",
  appId: "1:567437272231:web:a444f7e762df0f69c8a782",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
class OfficeServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      services: [],
      offices: [],
      loading: true,
      showOffices: false, // State to control office table visibility
      showServices: false, // State to control service table visibility
    };
  }

  componentDidMount() {
    this.authListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.setState({ isAuthenticated: true, user, loading: false });

        try {
          const servicesSnapshot = await getDocs(collection(db, 'services'));
          const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          this.setState({ services: servicesData });

          const officeSnapshot = await getDocs(collection(db, 'Office'));
          const officeData = officeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          this.setState({ offices: officeData });

        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      } else {
        this.setState({ isAuthenticated: false, user: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    if (this.authListener) {
      this.authListener();
    }
  }

  handleChange = (e, collection, id) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [collection]: prevState[collection].map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  }

  // Function to update office data
  handleUpdateOffice = async (e, id) => {
    e.preventDefault();
    const officeData = this.state.offices.find(item => item.id === id);
    if (!officeData) {
      console.error(`Office with ID ${id} not found.`);
      return;
    }

    try {
      await updateDoc(doc(db, 'Office', id), officeData);
      console.log(`Office document with ID ${id} updated successfully`);
    } catch (error) {
      console.error(`Error updating office document:`, error);
    }
  }

  // Function to update service data
  handleUpdateService = async (e, id) => {
    e.preventDefault();
    const serviceData = this.state.services.find(item => item.id === id);
    if (!serviceData) {
      console.error(`Service with ID ${id} not found.`);
      return;
    }

    try {
      await updateDoc(doc(db, 'services', id), serviceData);
      console.log(`Service document with ID ${id} updated successfully`);
    } catch (error) {
      console.error(`Error updating service document:`, error);
    }
  }

  toggleOffices = () => {
    this.setState((prevState) => ({
      showOffices: !prevState.showOffices,
      showServices: false // Hide services table when offices are shown
    }));
  }

  toggleServices = () => {
    this.setState((prevState) => ({
      showServices: !prevState.showServices,
      showOffices: false // Hide offices table when services are shown
    }));
  }

  handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        this.setState({ isAuthenticated: false, user: null });
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  renderTable = () => {
    const { showOffices, offices, showServices, services } = this.state;

    return (
      <>
        {showOffices && (
          <table className="table">
            <thead>
              <tr>
                <th>AR Name</th>
                <th>AR Slogan 1</th>
                <th>AR Slogan 2</th>
                <th>Office Name</th>
                <th>Slogan 1</th>
                <th>Slogan 2</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office) => (
                <tr key={office.id}>
                  <td><input type="text" name="arname" value={office.arname} onChange={(e) => this.handleChange(e, 'offices', office.id)} /></td>
                  <td><input type="text" name="arslogan_1" value={office.arslogan_1} onChange={(e) => this.handleChange(e, 'offices', office.id)} /></td>
                  <td><input type="text" name="arslogan_2" value={office.arslogan_2} onChange={(e) => this.handleChange(e, 'offices', office.id)} /></td>
                  <td><input type="text" name="officename" value={office.officename} onChange={(e) => this.handleChange(e, 'offices', office.id)} /></td>
                  <td><input type="text" name="slogan_1" value={office.slogan_1} onChange={(e) => this.handleChange(e, 'offices', office.id)} /></td>
                  <td><input type="text" name="slogan_2" value={office.slogan_2} onChange={(e) => this.handleChange(e, 'offices', office.id)} /></td>
                  <td>
                    <button onClick={(e) => this.handleUpdateOffice(e, office.id)}>Update Office</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showServices && (
          <table className="table">
            <thead>
              <tr>
                <th>AR Name</th>
                <th>Brief AR</th>
                <th>Brief EN</th>
                <th>Detailed AR</th>
                <th>Detailed EN</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td><input type="textarea" name="arname" value={service.arname} onChange={(e) => this.handleChange(e, 'services', service.id)} /></td>
                  <td><input type="textarea" name="brief_ar" value={service.brief_ar} onChange={(e) => this.handleChange(e, 'services', service.id)} /></td>
                  <td><input type="textarea" name="brief_en" value={service.brief_en} onChange={(e) => this.handleChange(e, 'services', service.id)} /></td>
                  <td><input type="textarea" name="detailed_ar" value={service.detailed_ar} onChange={(e) => this.handleChange(e, 'services', service.id)} /></td>
                  <td><input type="textarea" name="detailed_en" value={service.detailed_en} onChange={(e) => this.handleChange(e, 'services', service.id)} /></td>
                  <td><input type="textarea" name="name" value={service.name} onChange={(e) => this.handleChange(e, 'services', service.id)} /></td>
                  <td>
                    <button onClick={(e) => this.handleUpdateService(e, service.id)}>Update Service</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }

  render() {
    const { isAuthenticated, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="liton__wishlist-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="ltn__tab-menu-list mb-50">
                <div className="nav">
                  <a className="active show" data-bs-toggle="tab" href="#ltn_tab_1_1">Dashboard <i className="fas fa-home" /></a>
                </div>
                <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={this.toggleOffices} className={this.state.showOffices ? 'active' : ''}>Office Data</button>
                  <button onClick={this.toggleServices} className={this.state.showServices ? 'active' : ''}>Service Data</button>
                  <button onClick={this.handleSignOut}>Logout</button>
                </div>
              </div>
            </div>
            {this.renderTable()}
          </div>
        </div>
      </div>
    );
  }
}

export default OfficeServices;
