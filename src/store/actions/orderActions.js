import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurgerSuccess = (orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(orderData));
      }).catch(error => {
      dispatch(purchaseBurgerFail(error));
    });
  }
};