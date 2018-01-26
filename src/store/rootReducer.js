import {combineReducers} from 'redux';
import burgerReducer from './reducers/burgerReducer';
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  burger: burgerReducer,
  orders: orderReducer
});

export default rootReducer;
