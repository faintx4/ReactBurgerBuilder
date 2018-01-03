import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clickHandler}

    >
      {props.children}
      </button>
  );
};

button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  btnType: PropTypes.string.isRequired,
};

export default button;
