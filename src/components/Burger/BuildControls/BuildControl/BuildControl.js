import React from 'react';
import classes from './BuildControl.css';
import PropTypes from 'prop-types';

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less}>Less</button>
      <button className={classes.More} onClick={props.addIngredient}>More</button>
    </div>
  );
};

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  addIngredient: PropTypes.func.isRequired
};

export default buildControl;
