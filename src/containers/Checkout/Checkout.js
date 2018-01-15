import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: null,
    totalPrice: 0
  };


  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ingredients, totalPrice: price.toFixed(2)});

  }


  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let checkoutSummary = null;
    if (this.state.ingredients) {
      checkoutSummary = <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutContinueHandler={this.checkoutContinueHandler}
        checkoutCancelHandler={this.checkoutCancelHandler} />
    }

    return (
      <div>
        {checkoutSummary}
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice} />
          )}/>
      </div>
    );
  }
}


export default Checkout;
