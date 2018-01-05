import { call, fork, takeLatest } from 'redux-saga/effects';
// import { fetchUser, fetchUserLikes, fetchUserTracks } from 'src/core/api';
// import { getTracklistById, tracklistActions } from 'src/core/tracklists';
import { userActions } from './actions';
// import { getUserById } from './selectors';
import axios from 'axios';
const loginUrl = `https://views-api.herokuapp.com/api/users/signin`

function fetchProfile(username){


    return axios({
      url: `${loginUrl}/${username}/public_profile`,
      method: 'GET',
      // body: data,
      headers: {
        'Authorization': `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2g8i5Jwrb1DF9CHQdUmT0LejLpezKZuZ8C8P3y0t_7I`
      }
    })
    .then(response => response.json())
    .catch((error) => { throw error })
}

export function* loadUser({payload}) {
  const { username } = payload;
  let followersCount
  try {
    followersCount = yield call(fetchProfile, username);
  // ... regular action code
  } catch (e) {
    debugger
  }
  return followersCount;
  // const user = yield select(getUserById, userId);

  // if (!user || !user.profile) {

  // }
}



//=====================================
//  WATCHERS
//-------------------------------------

export function* watchLoadUser() {
  // while (true) {
    yield takeLatest(userActions.FETCH_PUBLIC_PROFILE, loadUser);
  // }
}


//=====================================
//  ROOT
//-------------------------------------

export const userSagas = [
  fork(watchLoadUser)
  // fork(watchLoadUserLikes),
  // fork(watchLoadUserTracks)
];
