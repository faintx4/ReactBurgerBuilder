import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Redirect, Switch} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/burger-builder" component={BurgerBuilder}/>
            <Route path="/orders" component={Orders}/>
            <Redirect exact from="/" to="/burger-builder"/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
