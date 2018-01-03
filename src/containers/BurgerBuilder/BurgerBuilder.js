import React, {Component} from 'react';
import Aux from '../../hoc/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  /*
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }
  */

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    updatedIngredients[type] = updatedIngredients[type] + 1;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    }, () => this.updatePurchaseState());
  };

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };

    if (updatedIngredients[type] <= 0) {
      return;
    }

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    updatedIngredients[type] = updatedIngredients[type] - 1;

    this.setState(() => {
      return {
        ingredients: updatedIngredients,
        totalPrice: newPrice
      };
    }, () => this.updatePurchaseState());


  };

  updatePurchaseState = () => {
    const ingredients = {...this.state.ingredients};

    const sum = Object.keys(ingredients).map(ingKey => {
      return ingredients[ingKey];
    }).reduce((sum, amount) => {
      return sum + amount;
    }, 0);

    this.setState({purchasable: sum > 0});
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    return null;
  };

  render() {

    let disabledBtns = {...this.state.ingredients};
    for (let key in disabledBtns) {
      disabledBtns[key] = disabledBtns[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} purchaseCancelHandler={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelHandler={this.purchaseCancelHandler}
            purchaseContinueHandler={this.purchaseContinueHandler}/>
        </Modal>

        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledBtns={disabledBtns}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
