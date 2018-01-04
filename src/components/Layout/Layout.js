import React, {Component} from 'react';
import Aux from '../../hoc/Auxil';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

  state = {
    showSideDrawer: false
  };

  openDrawerHandler = () => {
    this.setState({
      showSideDrawer: true
    });
  };

  closeDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar openDrawerHandler={this.openDrawerHandler}/>

        <SideDrawer
          open={this.state.showSideDrawer}
          closeDrawerHandler={this.closeDrawerHandler}/>

        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
