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
    let checkoutSummary = <Redirect to="/"/>;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      checkoutSummary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutContinueHandler={this.checkoutContinueHandler}
            checkoutCancelHandler={this.checkoutCancelHandler}/>
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>

      )
    }

    return (
      <div>{checkoutSummary}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.orders.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
