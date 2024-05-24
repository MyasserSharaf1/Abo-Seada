import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app"; // Import the entire Firebase library

import {
  getFirestore, collection,getDocs, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  updateDoc
} from 'firebase/firestore'

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
  const agenciesCollection = collection(db,'Agencies');

function TeamV2() {
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bayut.p.rapidapi.com/agencies/list', {
          params: {
            query: 'patriot',
            hitsPerPage: '3',
            page: '0',
            lang: 'en'
          },
          headers: {
            'x-rapidapi-key': 'f31e55296amsh94fc4e70252beffp1bd829jsnd2b635d70ef3',
            'x-rapidapi-host': 'bayut.p.rapidapi.com'
          }
        });

        
        setAgencies(response.data.hits);
        agencies.forEach(async (agency) => {
          await addDoc(agenciesCollection, agency); 
        });
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
    <div className="ltn__team-details-area mb-120">
      <div className="container">
        <div className="row">
		{agencies.map((agency) => (
            <div className="col-lg-4" key={agency.id}>
              <div className="ltn__team-details-member-info text-center mb-40">
                <div className="team-details-img">
                  <img src={agency.logo.url} alt="Team Member Image" />
                </div>
                <h2>{agency.name}</h2>
                <h6 className="text-uppercase ltn__secondary-color">Property Seller</h6>
              </div>
            </div>
          ))}
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequu ntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
			<div className="ltn__form-box contact-form-box box-shadow white-bg mt-50">
			<h4 className="title-2">Contact for any Inquiry</h4>
			{/*<form id="contact-form" action="mail.php" method="post">
				<div className="row">
				<div className="col-md-6">
					<div className="input-item input-item-name ltn__custom-icon">
					<input type="text" name="name" placeholder="Enter your name" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="input-item input-item-email ltn__custom-icon">
					<input type="email" name="email" placeholder="Enter email address" />
					</div>
				</div>
				<div className="col-md-6">
					<div className="input-item">
					<select className="nice-select">
						<option>Select Service Type</option>
						<option>Property Management </option>
						<option>Mortgage Service </option>
						<option>Consulting Service</option>
						<option>Home Buying</option>
						<option>Home Selling</option>
						<option>Escrow Services</option>
					</select>
					</div>
				</div>
				<div className="col-md-6">
					<div className="input-item input-item-phone ltn__custom-icon">
					<input type="text" name="phone" placeholder="Enter phone number" />
					</div>
				</div>
				</div>
				<div className="input-item input-item-textarea ltn__custom-icon">
				<textarea name="message" placeholder="Enter message" defaultValue={""} />
				</div>
				<p><label className="input-info-save mb-0"><input type="checkbox" name="agree" /> Save my name, email, and website in this browser for the next time I comment.</label></p>
				<div className="btn-wrapper mt-0">
				<button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">get an free service</button>
				</div>
				<p className="form-messege mb-0 mt-20" />
			</form>*/}
			</div>
		</div>
		</div>
	</div>
	
		);
        }


export default TeamV2