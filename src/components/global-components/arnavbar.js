import React, { Component } from "react";
import { Link } from "react-router-dom";
import Social from "../section-components/social";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      isAuthenticated: false
    };
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({
          displayName: user.displayName,
          isAuthenticated: true
        });
      } else {
        this.setState({
          isAuthenticated: false
        });
      }
    });
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    return (
      <div dir="rtl"> {/* Set the text direction to right-to-left */}
        <header className="ltn__header-area ltn__header-5 ltn__header-transparent--- gradient-color-4---">
          <div className="ltn__header-top-area section-bg-6 top-area-color-white---">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="ltn__top-bar-menu">
                    <ul>
                      <li>
                        <a href="mailto:mohamed.aboseada@offices.net?Subject=Flower%20greetings%20to%20you">
                          <i className="icon-mail" /> mohamed.aboseada@offices.net
                        </a>
                      </li>
                      <li>
                        <a href="locations.html">
                          <i className="icon-placeholder" /> مدينة نصر، القاهرة، مصر
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="top-bar-right text-end">
                    <div className="ltn__top-bar-menu">
                      <ul>
                        <li className="d-none">
                          <div className="ltn__drop-menu ltn__currency-menu ltn__language-menu">
                            <ul>
                              <li>
                                <a href="#" className="dropdown-toggle">
                                  <span className="active-currency">
                                    العربية
                                  </span>
                                </a>
                                <ul>
                                  <li>
                                    <Link to="#">English</Link>
                                  </li>
                                  <li>
                                    <Link to="#">Bengali</Link>
                                  </li>
                                  <li>
                                    <Link to="#">Chinese</Link>
                                  </li>
                                  <li>
                                    <Link to="#">French</Link>
                                  </li>
                                  <li>
                                    <Link to="#">Hindi</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <Social />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-white">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="site-logo-wrap ">
                    <div className="site-logo go-top">
                      <Link to="/arhome-v1">
                        <img
                          src={publicUrl + "assets/img/logo2.jpg"}
                          alt="Logo"
                          width={170}
                          height={150}
                        />
                      </Link>
                    </div>
                    <div className="get-support clearfix d-none">
                      <div className="get-support-icon">
                        <i className="icon-call" />
                      </div>
                      <div className="get-support-info">
                        <h6>احصل على الدعم</h6>
                        <h4>
                          <a href="tel:+123456789">123-456-789-10</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col header-menu-column">
                  <div className="header-menu d-none d-xl-block">
                    <nav>
                      <div className="ltn__main-menu go-top">
                        <ul>
                          <li>
                            <Link to="/arhome-v1">الرئيسية</Link>
                          </li>
                          <li>
                            <Link to="/arabout">عن الشركة</Link>
                            <ul>
                              <li>
                                <Link to="/arabout">عن الشركة</Link>
                              </li>
                              <li>
                                <Link to="/arservice">الخدمات</Link>
                              </li>
                              <li>
                                <Link to="/location">مواقع Google Map</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link to="/">تفاصيل</Link>
                            <ul>
                              <li>
                                <Link to="/my-account">حسابي</Link>
                              </li>
                              <li>
                                <Link to="/login">تسجيل الدخول</Link>
                              </li>
                              <li>
                                <Link to="/register">تسجيل</Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link to="/contact">اتصل بنا</Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="col ltn__header-options ltn__header-options-2 mb-sm-20">
                  <div className="ltn__drop-menu user-menu">
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="icon-user" />
                        </Link>
                        <ul className="go-top">
                          {this.state.isAuthenticated ? (
                            <>
                              <li>
                                <span>{this.state.displayName}</span>
                              </li>
                              <li>
                                <Link to="/my-account">حسابي</Link>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <Link to="/login">تسجيل الدخول</Link>
                              </li>
                              <li>
                                <Link to="/register">تسجيل</Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mobile-menu-toggle d-xl-none">
                    <a
                      href="#ltn__utilize-mobile-menu"
                      className="ltn__utilize-toggle"
                    >
                      <svg viewBox="0 0 800 600">
                        <path
                          d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                          id="top"
                        />
                        <path d="M300,320 L540,320" id="middle" />
                        <path
                          d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                          id="bottom"
                          transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          id="ltn__utilize-mobile-menu"
          className="ltn__utilize ltn__utilize-mobile-menu"
        >
          <div className="ltn__utilize-menu-inner ltn__scrollbar">
            <div className="ltn__utilize-menu-head">
              <div className="site-logo">
                <Link to="/arhome-v1">
                  <img src={publicUrl + "assets/img/logo.png"} alt="Logo" />
                </Link>
              </div>
              <button className="ltn__utilize-close">×</button>
            </div>
            <div className="ltn__utilize-menu-search-form">
              <form action={"#"}>
                <input type="text" placeholder="بحث..." />
                <button>
                  <i className="fas fa-search" />
                </button>
              </form>
            </div>
            <div className="ltn__utilize-menu">
              <ul>
                <li>
                  <a href="#">الرئيسية</a>
                </li>
                <li>
                  <Link to="/arabout">عن الشركة</Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/arabout">عن الشركة</Link>
                    </li>
                    <li>
                      <Link to="/arservice">الخدمات</Link>
                    </li>
                    <li>
                      <Link to="/location">مواقع Google Map</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/arhome-v1">تفاصيل</Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/my-account">حسابي</Link>
                    </li>
                    <li>
                      <Link to="/login">تسجيل الدخول</Link>
                    </li>
                    <li>
                      <Link to="/register">تسجيل</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/contact">اتصل بنا</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
