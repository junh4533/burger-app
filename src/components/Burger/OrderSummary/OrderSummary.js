import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        {igKey}:{props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <ul>{ingredientSummary}</ul>
    </Fragment>
  );
};

OrderSummary.propTypes = {
  //
};

export default OrderSummary;
