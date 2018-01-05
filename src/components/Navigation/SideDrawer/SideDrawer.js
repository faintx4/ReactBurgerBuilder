import React from 'react';
//import PropTypes from 'prop-types';
import classes from './SideDrawer.css';
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }


  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closeDrawerHandler}/>

      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <NavigationItems/>

      </div>
    </Aux>

  );
};

sideDrawer.propTypes = {};

export default sideDrawer;
