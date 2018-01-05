import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from "../../UI/Button/Button";


class OrderSummary extends Component {

  // OrderSummary could be a functional component, doesn't have to be a class component
  componentWillUpdate(nextProps, nextState) {
    console.log('[OrderSummary.js] WillUpdate');
  }

  render() {
    const ingredients = Object.keys(this.props.ingredients)
      .map((ingrKey) => {
        return (
          <li key={ingrKey}><strong
            style={{textTransform: 'capitalize'}}>{ingrKey}</strong>: {this.props.ingredients[ingrKey]}</li>
        )
      });

    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredients}
        </ul>
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clickHandler={this.props.purchaseCancelHandler}>Cancel</Button>
        <Button btnType="Success" clickHandler={this.props.purchaseContinueHandler}>Continue</Button>
      </Aux>
    );
  }

}

export default OrderSummary;
