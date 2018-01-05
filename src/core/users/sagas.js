import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'


import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_OUT,
  SALAM,
  PROFILE_SUCCESS
} from './constants'

import {
  setClient,
  unsetClient,
} from '../client/actions'

import { FETCH_PUBLIC_PROFILE_SUCCESS } from './constants';

import axios from 'axios';



const url = `https://views-api.herokuapp.com/api/users`
const loginSocialUrl = `${process.env.REACT_APP_API_URL}/sociallogin`


const profileApi = (username) => {

    return axios({
      url: `${url}/${username}/public_profile`,
      method: 'GET',
      headers: {
        'Authorization': `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.2g8i5Jwrb1DF9CHQdUmT0LejLpezKZuZ8C8P3y0t_7I`
      }
      // body: data,
    })
    // .then(handleApiErrors)
    .then(res => res.data)
    .catch((error) => { throw error })
}


function* logout () {
    yield put(unsetClient())
    localStorage.removeItem('token')
}

function* profileFlow (username) {
    let profile
    try {
        console.log("YEAP");
        // profile = yield call(profileApi, username);
        console.log("WOAH");
        // yield put(setClient(profile))
        yield put({type: PROFILE_SUCCESS, payload: profile });
        localStorage.setItem('profile', JSON.stringify(profile.user.authenticationToken));


    } catch (error) {
        // error? send it to redux
        yield put({ type: SALAM, error })
    } finally {
        // No matter what, if our `forked` `task` was cancelled
        // we will then just redirect them to login
        //yield put({ type: LOGIN_ERROR, error })
    }
    // return profile
}


function* profileWatcher () {
    while (true) {

        const { username } = yield take(FETCH_PUBLIC_PROFILE_SUCCESS)

        const data = yield call(profileApi, username);
        yield put({type: 'PROFILE_SUCCESS', payload: data.user })
        const action = yield take([LOGIN_OUT, LOGIN_ERROR])

        // if (action.type === LOGIN_OUT) {
        //     yield cancel(task)
        //
        // }

        // yield call(logout)
    }
}

export const userSagas = [
  fork(profileWatcher)
];
