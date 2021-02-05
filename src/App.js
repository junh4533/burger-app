import React, { Component } from "react";
import { Fragment } from "react";
// import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      // <div>
      //   <Layout>
      //     <BurgerBuilder />
      //   </Layout>
      // </div>
      // <Fragment>{true ? <BurgerBuilder /> : null}</Fragment>
      <BurgerBuilder />
    );
  }
}

export default App;
