import axios from "axios";
import API_END_POINT from "../config/index";
import {call, put} from "redux-saga/effects";

import {
  LIKE_POST,
  UNLIKE_POST
} from '../actionTypes';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';


const dislike = () => {
  return axios.post(API_END_POINT);
}

export const dislike = (websiteId) => (dispatch, getState) => {
  // optimistic update
  dispatch({
    type: LIKE_WEBSITE,
    postId,
  });

  const authToken = getAuthToken(getState());
  return axios({
    method: 'post',
    url: `${API_URL}/websites/${websiteId}/likes`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(response => {
    // request success no-op
  }, error => {
    // undo optimistic update
    dispatch({
      type: UNLIKE_WEBSITE,
      postId,
    });
    console.log('like website request failed', error);
  });
}

export const unDislike = (websiteId) => (dispatch, getState) => {
  dispatch({
    type: UNLIKE_WEBSITE,
    websiteId,
  });

  const authToken = getAuthToken(getState());
  return axios({
    method: 'delete',
    url: `${API_URL}/websites/${websiteId}/likes`,
    headers: {
      'Authorization': `Token ${authToken}`,
    },
  })
  .then(response => {
    // request success noop
  }, error => {
    // updo optimistic update
    dispatch({
      type: LIKE_WEBSITE,
      websiteId,
    });
  });
}

function *fetchCharacters () {
  try {
    const response = yield call(dislike);
    yield put({type: "RECEIVE_CHARACTERS", payload: response.data.results});
  } catch (e) {
    // TODO
  }

}

export {
  fetchCharacters
};
