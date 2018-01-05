import {
  FETCH_PUBLIC_PROFILE_SUCCESS,
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
  })

  // fetchProfileStart: username => ({
  //   type: FETCH_PUBLIC_PROFILE_START,
  //   username
  // })
}
