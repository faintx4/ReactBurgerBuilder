import React, {Component} from 'react';
import Aux from '../../hoc/Auxil';
import PropTypes from 'prop-types';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    ingredients: {
      salad:  0,
      bacon:  0,
      cheese: 0,
      meat:   0
    }
  };

/*
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }
*/

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {};

export default BurgerBuilder;
