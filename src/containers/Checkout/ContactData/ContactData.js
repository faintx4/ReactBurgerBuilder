import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({loading: true});

    const newOrder = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Serhii Blashkin',
        address: {
          street: 'Tsurupy 77',
          zipCode: '74988',
          country: 'Ukraine'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', newOrder)
      .then(response => {

        this.setState({loading: false});
        this.props.history.push('/');
      }).catch(error => {
      // this.setState(() => {
      //   return {loading: false, purchasing: false};
      // });
    }).finally(() => {
      // this.props.history.push('/checkout');
    });
  };

  render() {
    let orderForm = <Spinner/>;
    if (!this.state.loading) {
      orderForm = <Aux>
        <div className={classes.ContactData}>

          <h3>Enter Your Contact Data</h3>
          <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Your postal code"/>
            <Button btnType="Success" clickHandler={this.orderHandler}>ORDER</Button>
          </form>
        </div>
      </Aux>
    }
    return (
      orderForm
    );
  }
}

export default ContactData;
