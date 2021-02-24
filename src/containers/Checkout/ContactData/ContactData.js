import { Button } from "bootstrap";
import Spinner from "../../../components/UI/Spinner/Spinner";
import React, { Component } from "react";
import "./ContactData.scss";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zip: "",
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      customer: {
        name: "Jun Huang",
        adddress: {
          street: "586 50th St",
          zipCode: "11220",
        },
        email: "test@gmail.com",
      },
    };
    axios
      .post("/orders.json", order)
      .then((res, req) => {
        this.setState({ loading: false });
        this.props.history.push("/orders");
        // console.log(res);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };
  render() {
    let form = (
      <form action="">
        <input type="text" name="name" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Street" />
        <input type="text" placeholder="Zip" />
        <button className="btn btn-success" onClick={this.orderHandler}>
          Order
        </button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <h4>Contact Info</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps, null)(ContactData);
