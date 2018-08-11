import axios from 'axios';
import {
  LIKE_POST,
  UNLIKE_POST
} from '../actionTypes';
import { getAuthToken } from '../../store/rootReducer';
import { API_URL } from '../../config/constants';

export const likeSite = (websiteId) => (dispatch, getState) => {
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

export const unlikeSite = (postId) => (dispatch, getState) => {
  dispatch({
    type: UNLIKE_WEBSITE,
    postId,
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
