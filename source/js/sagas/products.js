import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_PRODUCTS_START,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
} from 'actions/products';
import api from 'api';

// -------- Get products

function createGetProducts(isServer = false) {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getProducts(options.id));
      const action = { type: GET_PRODUCTS_SUCCESS, data };
      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
      const action = { type: GET_PRODUCTS_ERROR, error };

      if (isServer) {
        return action;
      }

      yield put(action);
    }
  };
}

export const getProducts = createGetProducts();
export const getProductsServer = createGetProducts(true);


export function* getProductsWatcher() {
  yield takeLatest(GET_PRODUCTS_START, getProducts);
}


export default [
  getProductsWatcher(),
];
