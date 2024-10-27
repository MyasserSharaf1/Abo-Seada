import React, { Component } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officename: "",
      slogan_1: "",
      slogan_2: "",
      // Other state variables if needed
    };
  }

  async componentDidMount() {
    try {
      const querySnapshot = await getDocs(collection(db, "Office"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.setState({
          officename: data.officename || "Default Office Name",
          slogan_1: data.slogan_1 || "Default Slogan 1",
          slogan_2: data.slogan_2 || "Default Slogan 2",
        });
      });
    } catch (error) {
      console.error("Error fetching office data:", error);
    }
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";
    const { officename, slogan_1, slogan_2 } = this.state; // Use correct destructured names

    return (
      <div className="ltn__slider-area ltn__slider-3 section-bg-1 go-top">
        <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
          {/* ltn__slide-item */}
          <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3">
            <div className="ltn__slide-item-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <div className="slide-video mb-50 d-none"></div>
                        <h3 className="slide-sub-title white-color--- animated">
                          <span></span> {officename} {/* Use state variable */}
                        </h3>
                        <h3 className="slide-title animated ">
                          {slogan_1} {/* Use state variable */}
                        </h3>
                        <div className="slide-brief animated"></div>
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
                          "https://i.etsystatic.com/18578543/r/il/db4800/2632706125/il_fullxfull.2632706125_tw3o.jpg"
                        }
                        alt={imagealt}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ltn__slide-item */}
          <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal ltn__slide-item-3">
            <div className="ltn__slide-item-inner text-right text-end">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 align-self-center">
                    <div className="slide-item-info">
                      <div className="slide-item-info-inner ltn__slide-animation">
                        <h3 className="slide-sub-title white-color--- animated">
                          <span></span> {officename} {/* Use state variable */}
                        </h3>
                        <h3 className="slide-title animated ">
                          {slogan_2} {/* Use state variable */}
                        </h3>
                        <div className="slide-brief animated"></div>
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
                          "https://i.etsystatic.com/10420830/r/il/479eb3/5787057379/il_fullxfull.5787057379_dggr.jpg"
                        }
                        alt={imagealt}
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
