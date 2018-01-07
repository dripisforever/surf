import { combineReducers } from 'redux';

import { searchReducer } from './search';
import { tracksReducer } from './tracks';
import { tracklistsReducer } from './tracklists';
import {reducer as form} from 'redux-form';
import { loginReducer } from './login/';
import { clientReducer } from './client/reducer'
// import { currentUser } from './users/currentUser';
// import { publicProfiles } from './users/publicProfiles';
import currentUser, * as fromCurrentUser from './users/currentUser';
import publicProfiles, * as fromPublicProfiles from './users/publicProfiles';
import history from './history';
import { USER_SIGN_OUT } from '../views/actions/actionTypes';

const appReducer = combineReducers({
  form,
  currentUser: currentUser,
  client: clientReducer,
  login: loginReducer,
  search: searchReducer,
  tracks: tracksReducer,
  tracklists: tracklistsReducer,

  publicProfiles: publicProfiles
});

const rootReducer = (state, action) => {
  if (action.type === USER_SIGN_OUT) {
    // Reset redux state to initialState.
    state = undefined;
    // history.push('/signin');
  }

  return appReducer(state, action);
}

export default rootReducer;

/*** Selectors ***/
export const getIsSignedIn = (state) => {
  return Boolean(state.login.authenticationToken);
};

export const getCurrentUser = (state) => {
  return fromCurrentUser.getCurrentUser(state.login);
};

export const getAuthToken = (state) => {
  return fromCurrentUser.getAuthToken(state.login);
};

export const getAuthErrors = (state) => {
  return fromCurrentUser.getAuthErrors(state.currentUser);
};

export const getIsAuthenticating = (state) => {
  return fromCurrentUser.getIsAuthenticating(state.currentUser);
};

export const getIsLoggingInWithFB = (state) => {
  return fromCurrentUser.getIsLoggingInWithFB(state.currentUser);
};

// export const getCurrentUsersPosts = (state) => {
//   const postIds = fromCurrentUser.getPostIds(state.currentUser);
//   return fromPosts.getPostsByIds(state.posts, postIds);
// };


/* Returns object or false ***/
export const getPublicProfileByUsername = (state, username) => {
  return fromPublicProfiles.getPublicProfileByUsername(state.publicProfiles, username);
};

export const getPublicProfileErrors = (state) => {
  return fromPublicProfiles.getErrors(state.publicProfiles);
};

// export const getPostsByUsername = (state, username) => {
//   const postIds = fromPublicProfiles.getPostIdsByUsername(state.publicProfiles, username);
//   return fromPosts.getPostsByIds(state.posts, postIds);
// };

export const getIsFetchingPublicProfile = (state) => {
  return fromPublicProfiles.getIsFetchingPublicProfile(state.publicProfiles);
};
