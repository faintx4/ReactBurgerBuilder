import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {purchaseBurger} from '../../../store/actions/orderActions';

class ContactData extends Component {

  state = {
    formData: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        validation: {
          required: true
        },
        valid: false,
        value: '',
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        validation: {
          // required: true
        },
        valid: false,
        touched: false,
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
            {value: 'test', displayValue: 'Test'},
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      }
    },
    formValid: false
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    Object.keys(this.state.formData).map(inputName => {
      formData[inputName] = this.state.formData[inputName].value;
    });

    const newOrder = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      formData
    };

    this.props.onOrderBurger(newOrder);
  };

  onChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.formData
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formValid = true;
    for (let formElement in updatedOrderForm) {
      formValid = updatedOrderForm[formElement].valid && formValid;
    }

    this.setState({formData: updatedOrderForm, formValid});
  };

  onBlurHandler = (inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.formData
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({formData: updatedOrderForm});
  };

  createFormInputs = () => {
    return Object.keys(this.state.formData)
      .map(elemKey => {
        return <Input
          key={elemKey}
          elementType={this.state.formData[elemKey].elementType}
          elementConfig={this.state.formData[elemKey].elementConfig}
          value={this.state.formData[elemKey].value}
          valid={this.state.formData[elemKey].valid}
          shouldValidate={this.state.formData[elemKey].validation}
          touched={this.state.formData[elemKey].touched}
          changeHandler={(event) => this.onChangeHandler(event, elemKey)}
          blurHandler={() => {
            this.onBlurHandler(elemKey)
          }}
        />
      });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    return isValid;
  }

  render() {
    let orderForm = <Spinner/>;
    if (!this.props.loading) {
      orderForm = <Aux>
        <div className={classes.ContactData}>
          <h3>Enter Your Contact Data</h3>
          <form onSubmit={this.orderHandler}>
            {this.createFormInputs()}
            <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
          </form>
        </div>
      </Aux>
    }
    return orderForm;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (newOrder) => dispatch(purchaseBurger(newOrder))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
