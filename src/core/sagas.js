import { all } from 'redux-saga/effects'


import { searchSagas } from './search';
import { loginSagas } from './login';
import { userSagas } from './users';

export default function* sagas() {
  yield all([
    ...userSagas,
    ...searchSagas,
    ...loginSagas,

  ]);
}
