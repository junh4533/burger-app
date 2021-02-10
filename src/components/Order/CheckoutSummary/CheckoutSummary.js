import React, { Component } from "react";
import classes from "./CheckoutSummary.scss";
import Burger from "../../Burger/Burger";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <Burger ingredients={props.ingredients} />
      <button className="btn btn-danger" onClick={props.checkoutCancel}>
        Cancel
      </button>
      <button className="btn btn-success" onClick={props.checkoutContinue}>
        Continue
      </button>
    </div>
  );
};

export default checkoutSummary;
