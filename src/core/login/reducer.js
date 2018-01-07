import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  redirectTo: '',

  attributes: {
    // username: false,
  },


}

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
        redirectTo: ''
      }

    // Successful?  Reset the login state.
    case LOGIN_SUCCESS:
      return {
        // errors: [],
        // messages: [],
        // requesting: false,
        // successful: true,
        // redirectTo: '/dashboard',
        id: action.payload.id,
        authenticationToken: action.payload.authenticationToken,
        attributes: action.payload.attrs,
        postIds: action.payload.postIds,
        likedPostIds: action.payload.likedPostIds,
        followerIds: action.payload.followerIds,
        followingIds: action.payload.followingIds,
        errors: initialState.errors,
        isAuthenticating: false,
        isLoggingWithFB: false,
      }

    // Append the error returned from our api
    // set the success and requesting flags to false
    case LOGIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        // username: action.payload
        messages: [],
        requesting: false,
        successful: false,
        redirectTo: ''
      }

    default:
      return state
  }
}

// export default loginReducer;
