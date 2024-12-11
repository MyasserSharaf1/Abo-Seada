import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

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
      messages: [],
      trainees: [],
  showTrainees: false,
      loading: true,
      showOffices: false,
      showServices: false,
      showMessages: false,
      showNewServiceForm: false, 
      newService: {
        arname: '',
        brief_ar: '',
        brief_en: '',
        detailed_ar: '',
        detailed_en: '',
        name: '',
      },
    };
  }

  componentDidMount() {
    this.authListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.setState({ isAuthenticated: true, user, loading: false });

        try {
          const servicesSnapshot = await getDocs(collection(db, 'services'));
          const servicesData = servicesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ services: servicesData });

          const traineesSnapshot = await getDocs(collection(db, 'Trainees'));
          const traineesData = traineesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ trainees: traineesData });
          
          const officeSnapshot = await getDocs(collection(db, 'Office'));
          const officeData = officeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ offices: officeData });

          const messagesSnapshot = await getDocs(collection(db, 'Messages'));
          const messagesData = messagesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ messages: messagesData });
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

  HandleChange = (e, formType) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [formType]: {
        ...prevState[formType],
        [name]: value,
      },
    }));
  };
  
  handleChange = (e, collection, id) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [collection]: prevState[collection].map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
    }));
  };

  handleUpdateOffice = async (e, id) => {
    e.preventDefault();
    const officeData = this.state.offices.find((item) => item.id === id);
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
  };
  handleAddService = async (e) => {
    e.preventDefault();
    const { newService } = this.state;
  
    // Ensure all fields are filled out
    if (
      !newService.arname ||
      !newService.name ||
      !newService.brief_ar ||
      !newService.brief_en ||
      !newService.detailed_ar ||
      !newService.detailed_en
    ) {
      alert("Please fill out all fields");
      return;
    }
  
    try {
      // Add the new service to the Firestore 'services' collection
      const docRef = await addDoc(collection(db, 'services'), newService);
      this.setState((prevState) => ({
        services: [...prevState.services, { id: docRef.id, ...newService }],
        newService: {
          arname: '',
          brief_ar: '',
          brief_en: '',
          detailed_ar: '',
          detailed_en: '',
          name: '',
        },
      }));
      console.log("New service added successfully");
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };
  

  handleUpdateService = async (e, id) => {
    e.preventDefault();
    const serviceData = this.state.services.find((item) => item.id === id);
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
  };

// function to handle update
  handleUpdateTraineeSeen = async (id) => {
    try {
      const traineeRef = doc(db, 'Trainees', id);
      await updateDoc(traineeRef, {
        seen: true,
      });
      console.log(`Trainee with ID ${id} marked as seen`);
      this.setState((prevState) => ({
        trainees: prevState.trainees.map((trainee) =>
          trainee.id === id ? { ...trainee, seen: true } : trainee
        ),
      }));
    } catch (error) {
      console.error('Error updating seen status:', error);
    }
  };
  

  // Function to delete a service
  handleDeleteService = async (id) => {
    try {
      await deleteDoc(doc(db, 'services', id));
      this.setState((prevState) => ({
        services: prevState.services.filter((service) => service.id !== id),
      }));
      console.log(`Service with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting service with ID ${id}:`, error);
    }
  };

// function to handle delete Trainee
  handleDeleteTrainee = async (id) => {
    try {
      await deleteDoc(doc(db, 'Trainees', id));
      this.setState((prevState) => ({
        trainees: prevState.trainees.filter((trainee) => trainee.id !== id),
      }));
      console.log(`Trainee with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting trainee with ID ${id}:`, error);
    }
  };
  

  toggleTrainees = () => {
    this.setState((prevState) => ({
      showTrainees: !prevState.showTrainees,
      showOffices: false,
      showServices: false,
      showNewServiceForm : false ,
      showTrainees : false ,
    }));
  };
  

  toggleOffices = () => {
    this.setState((prevState) => ({
      showOffices: !prevState.showOffices,
      showServices: false,
      showMessages: false,
      showNewServiceForm : false ,
      showTrainees : false ,
    }));
  };

  toggleNewServiceForm = () => {
    this.setState((prevState) => ({
      showNewServiceForm: !prevState.showNewServiceForm,
      showOffices: false,
      showMessages: false,
      showTrainees : false ,
      showServices: false,
    }));
  };
  
  toggleServices = () => {
    this.setState((prevState) => ({
      showServices: !prevState.showServices,
      showOffices: false,
      showMessages: false,
      showNewServiceForm : false ,
      showTrainees : false ,
    }));
  };

  toggleMessages = () => {
    this.setState((prevState) => ({
      showMessages: !prevState.showMessages,
      showOffices: false,
      showServices: false,
      showNewServiceForm : false ,
      showTrainees : false ,
    }));
  };

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
    const { showOffices, showServices, showMessages, offices, services, messages, newService } = this.state;

    return (
      <>

{this.state.showTrainees && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>LinkedIn</th>
                <th>Resume Link</th>
                <th>Message</th>
                <th>Seen</th>
                <th>Mark as Seen</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {this.state.trainees.map((trainee) => (
                <tr key={trainee.id}>
                  <td>{trainee.name}</td>
                  <td>{trainee.email}</td>
                  <td>{trainee.phone}</td>
                  <td>{trainee.position}</td>
                  <td>{trainee.linkedin || 'N/A'}</td>
                  <td>
                    <a href={trainee.resumeURL} target="_blank" rel="noopener noreferrer">View Resume</a>
                  </td>
                  <td>{trainee.message || 'N/A'}</td>
                  <td>{trainee.seen ? 'Yes' : 'No'}</td>
                  <td>
                    {!trainee.seen && (
                      <button onClick={() => this.handleUpdateTraineeSeen(trainee.id)}>
                        Mark as Seen
                      </button>
                    )}
                    </td>
                    <td>
                    {/* Delete Button */}
                    <button onClick={() => this.handleDeleteTrainee(trainee.id)} style={{ marginLeft: '10px' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


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
                <th>number of clients</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office) => (
                <tr key={office.id}>
                  <td>
                    <textarea
                      name="arname"
                      value={office.arname}
                      onChange={(e) => this.handleChange(e, 'offices', office.id)}
                      style={{ height: 'auto', width: 'auto' }}
                      rows={1}
                    />
                  </td>
                  <td>
                    <textarea
                      name="arslogan_1"
                      value={office.arslogan_1}
                      onChange={(e) => this.handleChange(e, 'offices', office.id)}
                      style={{ height: 'auto', width: 'auto' }}
                    rows={1}
                    />
                  </td>
                  <td>
                    <textarea
                      name="arslogan_2"
                      value={office.arslogan_2}
                      onChange={(e) => this.handleChange(e, 'offices', office.id)}
                      style={{ height: 'auto', width: 'auto' }}
                    rows={1}
                    />
                  </td>
                  <td>
                    <textarea
                      name="officename"
                      value={office.officename}
                      onChange={(e) => this.handleChange(e, 'offices', office.id)}
                      style={{ height: 'auto', width: 'auto' }}
                      rows={1}
                    />
                  </td>
                  <td>
                    <textarea
                      name="slogan_1"
                      value={office.slogan_1}
                      onChange={(e) => this.handleChange(e, 'offices', office.id)}
                      style={{ height: 'auto', width: 'auto' }}
                      rows={1}
                    />
                  </td>
                  <td>
                    <textarea
                      name="slogan_2"
                      value={office.slogan_2}
                      onChange={(e) => this.handleChange(e, 'offices', office.id)}
                      style={{ height: 'auto', width: 'auto' }}
                    rows={1}
                    />
                  </td>
                  <td>
                    <textarea
                      name="no_of_customers"
                      value={office.no_of_customer}
                      onChange={(e) => this.handleChange(e, 'offices', office.id)}
                      style={{ height: 'auto', width: 'auto' }}
                    rows={1}
                    />
                  </td>
                  <td>
                    <button onClick={(e) => this.handleUpdateOffice(e, office.id)}>Update Office</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {this.state.showNewServiceForm && (
  <form onSubmit={this.handleAddService}>
    <table>
      <tbody>
        <tr>
          <td><label>Arabic Name:</label></td>
          <td>
            <input
              name="arname"
              value={newService.arname}
              onChange={(e) => this.HandleChange(e, 'newService')}
              style={{ height: 'auto', width: 'auto' }}
              rows={1}
              placeholder="Enter Arabic Name"
            />
          </td>
        </tr>
        <tr>
          <td><label>English Name:</label></td>
          <td>
            <input
              name="name"
              value={newService.name}
              onChange={(e) => this.HandleChange(e, 'newService')}
              style={{ height: 'auto', width: 'auto' }}
              rows={1}
              placeholder="Enter English Name"
            />
          </td>
        </tr>
        <tr>
          <td><label>Arabic Brief:</label></td>
          <td>
            <input
              name="brief_ar"
              value={newService.brief_ar}
              onChange={(e) => this.HandleChange(e, 'newService')}
              style={{ height: 'auto', width: 'auto' }}
              rows={1}
              placeholder="Enter Arabic Brief"
            />
          </td>
        </tr>
        <tr>
          <td><label>English Brief:</label></td>
          <td>
            <input
              name="brief_en"
              value={newService.brief_en}
              onChange={(e) => this.HandleChange(e, 'newService')}
              style={{ height: 'auto', width: 'auto' }}
              rows={1}
              placeholder="Enter English Brief"
            />
          </td>
        </tr>
        <tr>
          <td><label>Arabic Details:</label></td>
          <td>
            <input
              name="detailed_ar"
              value={newService.detailed_ar}
              onChange={(e) => this.HandleChange(e, 'newService')}
              style={{ height: 'auto', width: 'auto' }}
              rows={1}
              placeholder="Enter Arabic Details"
            />
          </td>
        </tr>
        <tr>
          <td><label>English Details:</label></td>
          <td>
            <input
              name="detailed_en"
              value={newService.detailed_en}
              onChange={(e) => this.HandleChange(e, 'newService')}
              style={{ height: 'auto', width: 'auto' }}
              rows={1}
              placeholder="Enter English Details"
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button type="submit">Add Service</button>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
)}

        
          
        
{showServices && (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Arabic Name</th>
                  <th>English Name</th>
                  <th>Arabic Brief</th>
                  <th>English Brief</th>
                  <th>Arabic Details</th>
                  <th>English Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <textarea
                        name="arname"
                        value={service.arname}
                        onChange={(e) => this.handleChange(e, 'services', service.id)}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="name"
                        value={service.name}
                        onChange={(e) => this.handleChange(e, 'services', service.id)}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="brief_ar"
                        value={service.brief_ar}
                        onChange={(e) => this.handleChange(e, 'services', service.id)}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="brief_en"
                        value={service.brief_en}
                        onChange={(e) => this.handleChange(e, 'services', service.id)}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="detailed_ar"
                        value={service.detailed_ar}
                        onChange={(e) => this.handleChange(e, 'services', service.id)}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="detailed_en"
                        value={service.detailed_en}
                        onChange={(e) => this.handleChange(e, 'services', service.id)}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <button onClick={(e) => this.handleUpdateService(e, service.id)}>Update Service</button>
                      <button onClick={() => this.handleDeleteService(service.id)}>Delete Service</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {showMessages && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((message) => (
                        <tr key={message.id}>
                         <td>
                      <textarea
                        name="arname"
                        value={message.name}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="arname"
                        value={message.email}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="arname"
                        value={message.phone}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
                    </td>
                    <td>
                      <textarea
                        name="arname"
                        value={message.service}
                        style={{ height: 'auto', width: '500px' }}
                        rows={1}
                      />
                    </td>
                          <td>
                      <textarea
                        name="arname"
                        value={message.message}
                        style={{ height: 'auto', width: 'auto' }}
                        rows={1}
                      />
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
    const { loading, isAuthenticated } = this.state;

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
                  <a className="active show" data-bs-toggle="tab" href="#ltn_tab_1_1">
                    Dashboard <i className="fas fa-home" />
                  </a>
                </div>
                {/* Buttons stacked vertically */}
                <div className="button-group" style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={this.toggleOffices}>Toggle Offices</button>
                  <button onClick={this.toggleServices}>Toggle Services</button>
                  <button onClick={this.toggleMessages}>Toggle Messages</button>
                  <button onClick={this.toggleNewServiceForm}>Add New Service</button>
                  <button onClick={this.toggleTrainees}>Show Trainees</button>
                  <button onClick={this.handleSignOut}>Sign Out</button>
                </div>
    
                {this.renderTable()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}

export default OfficeServices;
