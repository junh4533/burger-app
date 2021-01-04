import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import classes from "./Modal.css";
import { Fragment } from "react";

const CustomModal = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.show ? setShow(true) : setShow(false);
  }, [props.show]);

  return (
    <Fragment>
      <Modal show={show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.hide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

CustomModal.propTypes = {
  //
};

export default CustomModal;
