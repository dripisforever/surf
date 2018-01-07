import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'


import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_OUT
} from './constants'

import {
  setClient,
  unsetClient,
} from '../client/actions'
import history from '../history';
import {loadState} from '../connectivity/localStorage';







const loginUrl = `https://views-api.herokuapp.com/api/users/signin`;
const loginSocialUrl = `${process.env.REACT_APP_API_URL}/sociallogin`;

function loginApi (email, password) {

    const data = new FormData()
    data.append('username', email)
    data.append('password', password)

    return fetch(loginUrl, {
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

function* loginFlow (username, password, fullname,  fid, profile_picture) {
    let token
    try {
        if (typeof fullname !== "undefined") {
            token = yield call(loginSocialApi, fullname, username, fid, profile_picture)
        }else{
            token = yield call(loginApi, username, password)
            // localStorage.setItem('viewsly', JSON.stringify(token.user))
        }
        yield put(setClient(token))
        yield put({type: LOGIN_SUCCESS, payload: token.user})
        const state = loadState();
        history.push(`/${state.login.attributes.username}`);

    } catch (error) {
        // error? send it to redux
        yield put({ type: LOGIN_ERROR, error })
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

function* loginWatcher () {
    while (true) {

        const { username, password } = yield take(LOGIN_REQUESTING)
        const task = yield call(loginFlow, username, password)
        // const action = yield take([LOGIN_OUT, LOGIN_ERROR])

        // if (action.type === LOGIN_OUT) {
            // yield cancel(task)
            // yield call(logout)
        // }

        // yield call(logout)
    }
}

export const loginSagas = [
  fork(loginWatcher)
  // fork(watchLoadUserLikes),
  // fork(watchLoadUserTracks)
];

// export default loginWatcher
