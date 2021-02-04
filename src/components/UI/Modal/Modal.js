import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import classes from "./Modal.module.scss";
import { Fragment } from "react";

const CustomModal = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.show ? setShow(true) : setShow(false);
  }, [props.show]);

  // const confirmClicked = () => {
  //   props.confirm();
  //   props.hide();
  // };

  return (
    <Fragment>
      <Modal show={show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.hide}>
            Cancel
          </Button>
          <Button variant="success" onClick={props.confirm}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

CustomModal.propTypes = {
  //
};

export default React.memo(CustomModal, (props, nextProps) => {
  if (props.show !== nextProps.show) {
    // return true if you don't need re-render
    console.log("re-render");
    return false;
  }
});

// export default CustomModal;
