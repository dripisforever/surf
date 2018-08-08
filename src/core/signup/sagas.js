import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'


import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_OUT
} from './constants'

import {
  setClient,
  unsetClient,
} from '../client/actions'
import history from '../history';
import {loadState} from '../connectivity/localStorage';







// const loginUrl = `https://views-api.herokuapp.com/api/users/signup`;
const signupUrl = `http://localhost:5000/v1/users/signup`;
const loginSocialUrl = `${process.env.REACT_APP_API_URL}/sociallogin`;

function signupApi (email, username, password) {

    const data = new FormData()
    data.append('email', email)
    data.append('username', username)
    data.append('password', password)

    return fetch(signupUrl, {
      method: 'POST',
      body: data,
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(function(res){
        if (res.status === "error") {
            var error = new Error(res.message)
            error.response = res.message
            throw error
        }
        console.log(res);
        return res
    })
    .catch((error) => { throw error })
}

function loginSocialApi(fullname, username, fid, profile_picture) {
    const data = new FormData()
    data.append('username', username)
    data.append('fullname', fullname)
    data.append('fid', fid)
    data.append('profile_picture', profile_picture)

    return fetch(loginSocialUrl, {
      method: 'POST',
      body: data,
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(function(res){
        if (res.status === "error") {
            var error = new Error(res.message)
            error.response = res.message
            throw error
        }

        return res
    })
    .catch((error) => { throw error })
}

function* logout () {
    yield put(unsetClient())
    localStorage.removeItem('token')
}

const state = localStorage.viewsly;

function* signupFlow (email, username, password, fullname,  fid, profile_picture) {
    let token
    try {
        if (typeof fullname !== "undefined") {
            token = yield call(loginSocialApi, fullname, username, fid, profile_picture)
        }else{
            token = yield call(signupApi, email, username, password)
            // localStorage.setItem('viewsly', JSON.stringify(token.user))
        }
        yield put(setClient(token))
        yield put({type: SIGNUP_SUCCESS, payload: token.user})
        const state = loadState();
        history.push(`/${state.login.attributes.username}`);

    } catch (error) {
        // error? send it to redux
        yield put({ type: SIGNUP_ERROR, error })
    }
    // return token
}

function* loginSocial(fullname, username, fid, profile_picture) {
    let token
    try {

        token = yield call(loginSocialApi, fullname, username, fid, profile_picture)
        yield put(setClient(token))
        yield put({type: LOGIN_SUCCESS})
        localStorage.setItem('token', JSON.stringify(token))
    } catch (error) {
        // error? send it to redux
        yield put({ type: LOGIN_ERROR, error })
    }
    return token
}

function* signupWatcher () {
    while (true) {

        const { email, username, password } = yield take(SIGNUP_REQUESTING)
        const task = yield call(signupFlow, email, username, password)
        // const action = yield take([LOGIN_OUT, LOGIN_ERROR])

        // if (action.type === LOGIN_OUT) {
            // yield cancel(task)
            // yield call(logout)
        // }

        // yield call(logout)
    }
}

export const signupSagas = [
  fork(signupWatcher)
  // fork(watchLoadUserLikes),
  // fork(watchLoadUserTracks)
];

// export default loginWatcher
