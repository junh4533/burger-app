import React, { Component, Fragment } from "react";

// import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Router>
    );
  }
}

export default App;
