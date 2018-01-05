import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
