import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import CustomModal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Navigation from "../../components/Navigation";
import classes from "./BurgerBuilder.module.scss";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
  };

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

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    const orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={"$" + this.state.totalPrice}
      />
    );

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <div className={classes.burgerBuilderContainer}>
        <Navigation />
        <CustomModal
          body={orderSummary}
          show={this.state.purchasing}
          hide={this.hideModalHandler}
        />
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
      </div>
    );
  }
}

export default BurgerBuilder;
