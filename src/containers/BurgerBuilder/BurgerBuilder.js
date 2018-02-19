import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import {addIngredient, removeIngredient, initIngredients} from '../../store/actions/burgerBuilderActions';
import {purchaseInit} from '../../store/actions/orderActions';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchaseState = () => {
    const ingredients = {...this.props.ingredients};

    const sum = Object.keys(ingredients).map(ingKey => {
      return ingredients[ingKey];
    }).reduce((sum, amount) => {
      return sum + amount;
    }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.initPurchase();
    this.props.history.push('/checkout');
  };

  render() {

    let disabledBtns = {...this.props.ingredients};
    for (let key in disabledBtns) {
      disabledBtns[key] = disabledBtns[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Can't load ingredients!</p> : <Spinner/>;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabledBtns={disabledBtns}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState()}
            purchaseHandler={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        purchaseCancelHandler={this.purchaseCancelHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
        totalPrice={this.props.totalPrice}
      />;
    }


    return (
      <Aux>
        <Modal show={this.state.purchasing} purchaseCancelHandler={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
    removeIngredient: (ingredientName) => dispatch(removeIngredient(ingredientName)),
    initIngredients: () => dispatch(initIngredients()),
    initPurchase: () => dispatch(purchaseInit())
  };
};

/*
const mapDispatchToProps = dispatch => {
  return {
    addIngredient
  };
};*/


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
