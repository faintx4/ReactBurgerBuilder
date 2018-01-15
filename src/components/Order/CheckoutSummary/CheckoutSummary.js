import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Checkout Summary</h1>
      <Burger ingredients={props.ingredients}/>
      <Button btnType="Success" clickHandler={props.checkoutContinueHandler}>Continue</Button>
      <Button btnType="Danger" clickHandler={props.checkoutCancelHandler}>Cancel</Button>
    </div>
  );
};

export default checkoutSummary;
