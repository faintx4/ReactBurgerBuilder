import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('ingredients.json').then(res => {
      this.setState({ingredients: res.data});
    }).catch(error => {
      this.setState({error: true});
    })
  }

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

    const queryParams = [];
    queryParams.push(encodeURIComponent('price') + '=' + this.state.totalPrice);
    for (let ingKey in this.state.ingredients) {
      // const ingredientParam = `${ingKey}=${this.state.ingredients[ingKey]}`;
      queryParams.push(encodeURIComponent(ingKey) + '=' + encodeURIComponent(this.state.ingredients[ingKey]));
    }

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  };

  render() {

    let disabledBtns = {...this.state.ingredients};
    for (let key in disabledBtns) {
      disabledBtns[key] = disabledBtns[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Can't load ingredients!</p> : <Spinner/>;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelHandler={this.purchaseCancelHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
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

export default withErrorHandler(BurgerBuilder, axios);
