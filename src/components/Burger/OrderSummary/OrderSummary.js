import React, { Fragment } from "react";
import PropTypes from "prop-types";

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
      <p>
        Total Price: <b>{props.price}</b>
      </p>
    </Fragment>
  );
};

OrderSummary.propTypes = {
  //
};

export default OrderSummary;
