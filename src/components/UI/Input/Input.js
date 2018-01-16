import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

const Input = (props) => {
  let inputElement = '';

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changeHandler}/>;
      break;
    case ('select'):
      inputElement = (
        <select className={classes.InputElement}
                value={props.elementConfig.options[0].value}
                onChange={props.changeHandler}>
          {props.elementConfig.options.map(option => {
            return <option
              value={option.value}
              key={option.value}>
              {option.displayValue}
            </option>;
          })}
        </select>
      );
      break;
    case ('textarea'):
      inputElement = <textarea
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changeHandler}/>;
      break;
    default:
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changeHandler}/>;
  }


  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired
};

export default Input;
