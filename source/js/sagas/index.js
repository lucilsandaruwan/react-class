import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import productsSagas from 'sagas/products';

export default function* rootSaga() {
  yield all([
    ...peopleSagas,
    ...productsSagas,
  ]);
}
