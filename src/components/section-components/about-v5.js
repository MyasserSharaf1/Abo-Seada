import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV5 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="ltn__about-us-area pb-115 go-top">
				<div className="container">
				<div className="row">
					<div className="col-lg-5 align-self-center">
					<div className="about-us-img-wrap ltn__img-shape-left  about-img-left">
						<img src="https://www.novisign.com/wp-content/uploads/2019/03/digital-signage-for-accounting-office.jpg"
						 alt="Image" />
					</div>
					</div>
					<div className="col-lg-7 align-self-center">
					<div className="about-us-info-wrap">
						<div className="section-title-area ltn__section-title-2--- mb-20">
						<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">About Us</h6>
						<h1 className="section-title"> Abo Seada office<span>.</span></h1>
						<p>Over 130 customer work for us in Egypt</p>
						</div>
						<div className="about-us-info-wrap-inner about-us-info-devide---">
						</div>
						<div className="btn-wrapper animated">
						<Link to="/about" className="theme-btn-1 btn btn-effect-1 text-uppercase">About Us</Link>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>	
        }
}

export default AboutV5