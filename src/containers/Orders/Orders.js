import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

  state = {
    ordersMap: null
  };

  componentDidMount() {
    axios.get('orders.json')
      .then(response => {
        const orders = response.data;
        this.setState({ordersMap: orders});
      }).catch(() => {

    });
  }

  render() {
    let orders = <Spinner/>;
    if (this.state.ordersMap) {
      /*this.state.pairsIdOrder.forEach((pair) => {

      })*/
      /* orders = this.state.pairsIdOrder.map((pair) => {
         return <Order key={pair[0]} salad={pair[1].ingredients.salad}/>
       });*/
      orders = Object.keys(this.state.ordersMap).map((key) => {
        return <Order key={key}
                      {...this.state.ordersMap[key].ingredients}
                      price={this.state.ordersMap[key].price}/>
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


export default withErrorHandler(Orders, axios);
