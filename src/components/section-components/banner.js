import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

class Banner extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";

    return (
      <div className="ltn__slider-area ltn__slider-3  section-bg-1 go-top">
        <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
          {/* ltn__slide-item */}
          <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3">
            <div className="ltn__slide-item-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <div className="slide-video mb-50 d-none">
                          <a
                            className="ltn__video-icon-2 ltn__video-icon-2-border"
                            href="https://www.youtube.com/embed/83oW09FiZ9k?si=JUljRFe6bd-sZVgn"
                            data-rel="lightcase:myCollection"
                          >
                            <i className="fa fa-play" />
                          </a>
                        </div>
                        <h3 className="slide-sub-title white-color--- animated">
                          <span>
                            
                          </span>{" "}
                          Abo Seada Office
                        </h3>
                        <h3 className="slide-title animated ">
                        Expert Auditing,<br/> Simplified Taxation,<br/> Accurate Accounting
                        </h3>
                        <div className="slide-brief animated">
                         
                        </div>
                        <div className="btn-wrapper animated ">
                          <Link
                            to="/about"
                            className="theme-btn-1 btn btn-effect-1 go-top"
                          >
                            Make An Enquiry
                          </Link>
                          
                        </div>
                      </div>
                    </div>
                    <div className="slide-item-img">
                      <img
                        src={
                          "https://www.propertyfinder.eg/blog/wp-content/uploads/2018/01/UIA0lUqvlPMy9ghblSw2xHcHK3gSxB-1.jpg"
                        }
                        alt="#"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ltn__slide-item */}
          <div className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal ltn__slide-item-3">
            <div className="ltn__slide-item-inner  text-right text-end">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <h3 className="slide-sub-title white-color--- animated">
                          <span>
                            
                          </span>{" "}
                          Abo Seada Office
                        </h3>
                        <h className="slide-title animated ">
                        Navigating Taxes,<br/> Auditing Success
                        </h>
                        <div className="slide-brief animated">
                          
                        </div>
                        <div className="btn-wrapper animated">
                          <Link
                            to="/service"
                            className="theme-btn-1 btn btn-effect-1"
                          >
                            OUR SERVICES
                          </Link>
                          <Link
                            to="/about"
                            className="btn btn-transparent btn-effect-3"
                          >
                            LEARN MORE
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="slide-item-img slide-img-left">
                      <img
                        src={
                          "https://golfportomarina.com/wp-content/uploads/2021/07/the-city-of-odyssia-compound.jpg"
                        }
                        alt="#"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    );
  }
}

export default Banner;
