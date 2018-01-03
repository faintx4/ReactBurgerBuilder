import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad',  type: 'salad'},
  {label: 'Bacon',  type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat',   type: 'meat'}
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map((control) => {
        return <BuildControl
          key={control.label}
          label={control.label}
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)}
          disabled={props.disabledBtns[control.type]}
        />
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >ORDER NOW</button>
    </div>
  );
};

buildControls.propTypes = {
  disabledBtns: PropTypes.shape({
    salad: PropTypes.bool,
    bacon:PropTypes.bool,
    cheese:PropTypes.bool,
    meat:PropTypes.bool
  }).isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired
};

export default buildControls;
