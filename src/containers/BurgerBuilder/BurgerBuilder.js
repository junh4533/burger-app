import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import CustomModal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import classes from "./BurgerBuilder.module.scss";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://burger-builder-1f1d0-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  hideModalHandler = () => {
    this.setState({ purchasing: false });
  };

  confirmPurchaseHandler = () => {
    this.hideModalHandler();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    let orderSummary = null;
    let burger = this.state.error ? <p>Server Error</p> : <Spinner />;

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.props.ings) {
      burger = (
        <Container fluid>
          <Row>
            <Col xs={12} lg={6}>
              <Burger ingredients={this.props.ings} />
            </Col>
            <Col
              xs={12}
              lg={6}
              className="d-flex justify-content-center align-items-center"
            >
              <BuildControls
                ingredientAdded={this.props.onAddIngredient}
                ingredientRemoved={this.props.onRemoveIngredient}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchaseable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
              />
            </Col>
          </Row>
        </Container>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={"$" + this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <div className={classes.burgerBuilderContainer}>
        {/* <Navigation /> */}
        <CustomModal
          body={orderSummary}
          show={this.state.purchasing}
          hide={this.hideModalHandler}
          confirm={this.confirmPurchaseHandler}
        />
        {burger}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: ingName,
      }),
    onRemoveIngredient: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
