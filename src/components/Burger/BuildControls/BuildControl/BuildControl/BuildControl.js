import React from "react";
import PropTypes from "prop-types";
import classes from "./BuildControl.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPlusCircle as faPlusCircleFilled,
  faMinusCircle as faMinusCircleFilled,
} from "@fortawesome/free-solid-svg-icons";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div>{props.label}</div>
      <div className={classes.Label}>{props.label}</div>
      <FontAwesomeIcon
        className={classes.editQuantityButton}
        icon={faMinusCircleFilled}
        onClick={props.removed}
        disabled={props.disabled}
      />
      <FontAwesomeIcon
        className={classes.editQuantityButton}
        icon={faPlusCircleFilled}
        onClick={props.added}
      />
    </div>
  );
};

BuildControl.propTypes = {
  //
};

export default BuildControl;
