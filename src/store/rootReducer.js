import {combineReducers} from 'redux';
import burgerReducer from './reducers/burgerReducer';

const rootReducer = combineReducers({
  burger: burgerReducer
});

export default rootReducer;
