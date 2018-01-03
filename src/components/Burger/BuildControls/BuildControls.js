import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((control) => {
        return <BuildControl
          key={control.label}
          label={control.label}
          addIngredient={() => props.addIngredient(control.type)}/>
      })}
    </div>
  );
};

buildControls.propTypes = {
  addIngredient: PropTypes.func.isRequired
};

export default buildControls;
