import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (!props.valid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Error);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changeHandler}
        onBlur={props.blurHandler}
      />;
      break;
    case ('select'):
      inputElement = (
        <select className={inputClasses.join(' ')}
                value={props.value}
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
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changeHandler}
        onBlur={props.blurHandler}
      />;
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changeHandler}
        onBlur={props.blurHandler}
      />;
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
  elementConfig: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default Input;
