import {
  FETCH_PUBLIC_PROFILE_SUCCESS,
  USER_SIGN_OUT
} from './constants';

// export const fetchPublicProfile = (username) => {
//   return {
//     type: FETCH_PUBLIC_PROFILE,
//     payload: {
//       // id: id,
//       username: username
//     }
//   }
// }


export const userActions = {

  fetchPublicProfile: username => ({
    type: FETCH_PUBLIC_PROFILE_SUCCESS,
    username,
    payload: {
      username: username,
      // id: id
    }
  }),

  logOut: () => ({
    type: USER_SIGN_OUT
  })
  // fetchPostsByUsername: username => ({
  //   type: FETCH_POSTS_BY_USERNAME,
  // })
  // fetchProfileStart: username => ({
  //   type: FETCH_PUBLIC_PROFILE_START,
  //   username
  // })
}
