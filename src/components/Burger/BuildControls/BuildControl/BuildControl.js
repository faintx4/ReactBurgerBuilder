import React from 'react';
import classes from './BuildControl.css';
import PropTypes from 'prop-types';

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button disabled={props.disabled} className={classes.Less} onClick={props.removeIngredient}>Less</button>
      <button className={classes.More} onClick={props.addIngredient}>More</button>
    </div>
  );
};

buildControl.propTypes = {
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired
};

export default buildControl;
