import React, {Component} from 'react';
import Aux from '../../hoc/Auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
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

    this.setState(() => {
      return {
        ingredients: updatedIngredients,
        totalPrice: newPrice
      };
    });
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
    });


  };

  render() {
    let disabledBtns = {...this.state.ingredients};
    for (let key in disabledBtns) {
      disabledBtns[key] = disabledBtns[key] <= 0;

    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>total price: {this.state.totalPrice}</div>
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledBtns={disabledBtns}
        />
      </Aux>
    );
  }
}


export default BurgerBuilder;
