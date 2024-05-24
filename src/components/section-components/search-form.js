import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyStatus: 'Property Status', // Default value for the select input
            redirect: false, // State to handle redirection
        };
    }

    handlePropertyStatusChange = (event) => {
        this.setState({ propertyStatus: event.target.value });
    };

    handleFindNowClick = () => {
        this.setState({ redirect: true });
    };

    render() {
        const { propertyStatus, redirect } = this.state;

        // Determine the route based on the selected property status
        let route = "/shop";
        if (propertyStatus === "Rent") {
            route = "/Rent-Shop";
        } else if (propertyStatus === "Sale") {
            route = "/Sale-Shop";
        }

        // Redirect to the selected route if redirect state is true
        if (redirect) {
            return <Redirect to={route} />;
        }

        return (
            <div className="ltn__car-dealer-form-area mt--65 mt-120 pb-115---">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ltn__car-dealer-form-tab">
                                <div className="ltn__tab-menu text-uppercase d-none">
                                    <div className="nav">
                                        <a className="active show" data-bs-toggle="tab" href="#ltn__form_tab_1_1"><i className="fas fa-car" />Find A Car</a>
                                        <a data-bs-toggle="tab" href="#ltn__form_tab_1_2"><i className="far fa-user" />Get a Dealer</a>
                                    </div>
                                </div>
                                <div className="tab-content bg-white box-shadow-1 position-relative pb-10">
                                    <div className="tab-pane fade active show" id="ltn__form_tab_1_1">
                                        <div className="car-dealer-form-inner">
                                            <form action="#" className="ltn__car-dealer-form-box row">
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-car---- col-lg-3 col-md-6">
                                                    {/* Placeholder for future select input */}
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon---- ltn__icon-meter---- col-lg-3 col-md-6">
                                                    <select className="nice-select" value={propertyStatus} onChange={this.handlePropertyStatusChange}>
                                                        <option value="Property Status">Property Status</option>
                                                        <option value="Rent">Rent</option>
                                                        <option value="Sale">Sale</option>
                                                    </select>
                                                </div>
                                                <div className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar col-lg-3 col-md-6">
                                                    <div className="btn-wrapper text-center mt-0 go-top">
                                                        <button type="button" onClick={this.handleFindNowClick} className="btn theme-btn-1 btn-effect-1 text-uppercase">Find Now</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="ltn__form_tab_1_2">
                                        <div className="car-dealer-form-inner">
                                            {/* Content for "Get a Dealer" tab */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;
