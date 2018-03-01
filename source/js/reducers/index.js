import { combineReducers } from 'redux';
import app from 'reducers/app';
import people from 'reducers/people';
import products from 'reducers/products';

export default combineReducers({
  app,
  people,
  products,
});
