import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

  state = {
    formData: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
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

      }
    ;

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

  onChangeHandler = (event, inputEl) => {
    console.log(event.target.value, inputEl);
    // this.setState({
    //   formData: {}
    // });
  };

  createForm = () => {
    return Object.keys(this.state.formData)
      .map(elemKey => {
        return <Input
          key={elemKey}
          elementType={this.state.formData[elemKey].elementType}
          elementConfig={this.state.formData[elemKey].elementConfig}
          value={this.state.formData[elemKey].value}
          changeHandler={(event) => this.onChangeHandler(event, elemKey)}
        />
      });
  };

  render() {
    let orderForm = <Spinner/>;
    if (!this.state.loading) {
      orderForm = <Aux>
        <div className={classes.ContactData}>
          <h3>Enter Your Contact Data</h3>
          <form>
            {this.createForm()}
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
