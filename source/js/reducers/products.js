import { Map } from 'immutable';

import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
} from 'actions/products';

const initialState = Map({
  loading: false,
  error: null,
  products: null,
});

const actionsMap = {
  // Async action
  [GET_PRODUCTS_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      products: null,
    }));
  },
  [GET_PRODUCTS_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_PRODUCTS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      products: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
