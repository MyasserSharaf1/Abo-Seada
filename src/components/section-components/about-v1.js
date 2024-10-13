import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

class AboutV1 extends Component {
  render() {
    let publicUrl = "../../../public/";

    return (
      <div className="ltn__about-us-area pt-120 pb-90 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <img
                  src="https://media.istockphoto.com/id/1096860416/photo/accountant-working-with-us-tax-forms.jpg?s=612x612&w=0&k=20&c=iTeEa7-FrsAdM2DGPxnx_T7dyoW9MKK_4hauIEFNTAo="
                  alt="About Us Image"
                />
                <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                  <div className="ltn__video-img ltn__animation-pulse1">
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-20">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                    About Us
                  </h6>
                  <h1 className="section-title">
                  <span></span>
                  </h1>
                  
                </div>
                <ul className="ltn__list-item-half clearfix">
                  <li>
                    <i className="flaticon-home-2" />
                    Smart Home Design
                  </li>
                  <li>
                    <i className="flaticon-mountain" />
                    Beautiful Scene Around
                  </li>
                  <li>
                    <i className="flaticon-heart" />
                    Exceptional Lifestyle
                  </li>
                  <li>
                    <i className="flaticon-secure" />
                    Complete 24/7 Security
                  </li>
                </ul>
                <div className="ltn__callout bg-overlay-theme-05  mt-30">
                  
                </div>
                <div className="btn-wrapper animated go-top">
                  <Link to="/service" className="theme-btn-1 btn btn-effect-1">
                    OUR SERVICES
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutV1;
