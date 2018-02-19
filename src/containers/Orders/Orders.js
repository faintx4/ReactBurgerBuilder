import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {fetchOrders} from '../../store/actions/orderActions';


class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders();

    /*axios.get('orders.json')
      .then(response => {
        const orders = response.data;
        this.setState({ordersMap: orders});
      }).catch(() => {

    });*/
  }

  render() {
    let orders = <Spinner/>;
    if (this.props.orders) {
      /*this.state.pairsIdOrder.forEach((pair) => {

      })*/
      /* orders = this.state.pairsIdOrder.map((pair) => {
         return <Order key={pair[0]} salad={pair[1].ingredients.salad}/>
       });*/
      orders = Object.keys(this.props.orders).map((key) => {
        return <Order key={key}
                      {...this.props.orders[key].ingredients}
                      price={this.props.orders[key].price}/>
      });

    }

    return (
      <div className={classes.Orders}>
        <h1>Orders:</h1>
        <div>{orders}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => {dispatch(fetchOrders())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
