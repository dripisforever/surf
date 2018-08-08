import {
  SIGNUP_REQUESTING,
} from './constants'

// In order to perform an action of type LOGIN_REQUESTING
// we need an email and password
export const signupRequest = ({ email, username, password }) => {
  return {
    type: SIGNUP_REQUESTING,
      email,
      username,
      password
  }
}

// Since it's the only one here
// export const loginRequest;
