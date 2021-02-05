import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import CustomModal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Navigation from "../../components/Navigation";
import classes from "./BurgerBuilder.module.scss";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchaseable: false,
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
    // const ingredients = {
    //   ...this.state.ingredients,
    // };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  hideModalHandler = () => {
    this.setState({ purchasing: false });
  };

  confirmPurchaseHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      .post("/orders", order)
      .then((res, req) => {
        this.setState({ loading: false });
        // console.log(res);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });

    this.hideModalHandler();
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    let orderSummary = null;
    let burger = this.state.error ? <p>Server Error</p> : <Spinner />;

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.state.ingredients) {
      burger = (
        <Container fluid>
          <Row>
            <Col xs={12} lg={6}>
              <Burger ingredients={this.state.ingredients} />
            </Col>
            <Col
              xs={12}
              lg={6}
              className="d-flex justify-content-center align-items-center"
            >
              <BuildControls
                ingredientAdded={this.addIngredientsHandler}
                ingredientRemoved={this.removeIngredientsHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}
              />
            </Col>
          </Row>
        </Container>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={"$" + this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <div className={classes.burgerBuilderContainer}>
        <Navigation />
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

export default withErrorHandler(BurgerBuilder, axios);
