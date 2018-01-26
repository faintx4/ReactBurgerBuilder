import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let checkoutSummary = null;
    if (this.props.ingredients) {
      checkoutSummary = <CheckoutSummary
        ingredients={this.props.ingredients}
        checkoutContinueHandler={this.checkoutContinueHandler}
        checkoutCancelHandler={this.checkoutCancelHandler} />
    } else {
      checkoutSummary = <Redirect to="/"/>
    }

    return (
      <div>
        {checkoutSummary}
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
          />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
