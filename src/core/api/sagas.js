import { call, put } from 'redux-saga/effects';
import { tracklistRequestActions } from '../tracklists/actions';
import { api } from './api-service';


function* fetchEntities(apiFunction, actions, id, param, page) {
  try {
    yield put(actions.pending(id));
    const data = yield call(apiFunction, param, page || id);
    yield put(actions.fulfilled(id, data));
  }
  catch (error) {
    yield put(actions.failed(error));
  }
}


export const fetchSearchResults = fetchEntities.bind(null, api.fetchSearchResults, tracklistRequestActions);
