import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class ContactInfo extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="ltn__contact-address-area mb-90">
				<div className="container">
				<div className="row">
					<div className="col-lg-4">
					<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
						<div className="ltn__contact-address-icon">
						<img src={publicUrl+"assets/img/icons/10.png"} alt="Icon Image" />
						</div>
						<h3>Email Address</h3>
						<a href="mailto:mohamed.aboseada@offices.net?Subject=Flower%20greetings%20to%20you">
   <br/>mohamed.aboseada@offices.net
</a>
					</div>
					</div>
					<div className="col-lg-4">
					<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
						<div className="ltn__contact-address-icon">
						<img src={publicUrl+"assets/img/icons/11.png"} alt="Icon Image" />
						</div>
						<h3>Phone Number</h3>
						<p>
    <a href="tel:+01120761611">01120761611</a>
  </p>
  <p>
    <a href="tel:+01092952221">01092952221</a>
  </p>
  <p>
    <a href="tel:+01028998815">01028998815</a>
  </p>
					</div>
					</div>
					<div className="col-lg-4">
					<div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
						<div className="ltn__contact-address-icon">
						<img src={publicUrl+"assets/img/icons/12.png"} alt="Icon Image" />
						</div>
						<h3>Office Address</h3>
						<p>Nasr City,Cairo  <br />
						Egypt</p>
					</div>
					</div>
				</div>
				</div>
			</div>
        }
}

export default ContactInfo