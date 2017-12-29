import { all } from 'redux-saga/effects'


import { searchSagas } from './search';
import { loginSagas } from './login';


export default function* sagas() {
  yield all([
    ...searchSagas,
    ...loginSagas
  ]);
}
