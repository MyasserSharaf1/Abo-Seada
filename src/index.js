import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import HomeV1 from "./components/home-v1";


import About from "./components/about";
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
import Team from "./components/team";
import TeamDetails from "./components/team-details";

import Error from "./components/404";
import Location from "./components/location";




import Contact from "./components/contact";
import feedback from "./components/Feedback";

import MyAccount from "./components/my-account";
import Login from "./components/login";
import Register from "./components/register";


import { MoralisProvider } from "react-moralis";

class Root extends Component {
  render() {
    return (
      <MoralisProvider initializeOnMount={false}>
        <HashRouter basename="/">
          <div>
            <Switch>
              <Route exact path="/" component={HomeV1} />
            
              <Route path="/about" component={About} />
              <Route path="/service" component={Service} />
              <Route path="/service-details" component={ServiceDetails} />
              <Route path="/team" component={Team} />
              <Route path="/team-details/:property" component={TeamDetails} />
              <Route path="/404" component={Error} />
              <Route path="/location" component={Location} />
              <Route path="/contact" component={Contact} />
              <Route path="/feedback" component={feedback} />
              <Route path="/my-account" component={MyAccount} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </HashRouter>
      </MoralisProvider>
    );
  }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById("quarter"));
