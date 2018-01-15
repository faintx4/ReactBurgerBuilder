import React from 'react';
import classes from './NavigationItem.css';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default navigationItem;
