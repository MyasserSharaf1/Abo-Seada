import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class CallToActonV1 extends Component {
    render() {
        let publicUrl = process.env.PUBLIC_URL + '/'
        let imagealt = 'image'

        return (
            <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="call-to-action-inner call-to-action-inner-6 ltn__secondary-bg position-relative text-center---">
                                <div className="coll-to-info text-color-white">
                                    <h1>اتصل بنا</h1>
                                    <h3>دعنا نساعدك في التنقل عبر رحلتك المالية</h3>
                                </div>
                                <div className="btn-wrapper go-top">
                                    <Link className="btn btn-effect-3 btn-white" to="/contact"><i className="icon-next" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CallToActonV1;
