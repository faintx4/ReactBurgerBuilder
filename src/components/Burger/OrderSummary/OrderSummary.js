import React from 'react';
import Aux from '../../../hoc/Auxil';
import Button from "../../UI/Button/Button";


const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients)
    .map((ingrKey) => {
      return (
        <li key={ingrKey}><strong style={{textTransform: 'capitalize'}}>{ingrKey}</strong>: {props.ingredients[ingrKey]}</li>
      )
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredients}
      </ul>
      <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clickHandler={props.purchaseCancelHandler}>Cancel</Button>
      <Button btnType="Success" clickHandler={props.purchaseContinueHandler}>Continue</Button>
    </Aux>

  );
};

export default orderSummary;
