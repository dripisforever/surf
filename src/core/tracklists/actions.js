import { FEATURED_TRACKLIST_ID, FEATURED_TRACKLIST_USER_ID } from '../constants';

export const LIKE_TRACK = 'LIKE_TRACK';
export const UNLIKE_TRACK = 'LIKE_TRACK';
export const LIKE_RESULT_TRACK = 'LIKE_RESULT_TRACK';


export const tracklistActions = {
  FETCH_TRACKS_FAILED: 'FETCH_TRACKS_FAILED',
  FETCH_TRACKS_FULFILLED: 'FETCH_TRACKS_FULFILLED',
  FETCH_TRACKS_PENDING: 'FETCH_TRACKS_PENDING',

  LIKE_TRACK: 'LIKE_TRACK',
  UNLIKE_TRACK: 'UNLIKE_TRACK',
  LIKE_RESULT_TRACK: 'LIKE_RESULT_TRACK',
  LOAD_FEATURED_TRACKS: 'LOAD_FEATURED_TRACKS',
  LOAD_NEXT_TRACKS: 'LOAD_NEXT_TRACKS',
  MOUNT_TRACKLIST: 'MOUNT_TRACKLIST',
  UPDATE_PAGINATION: 'UPDATE_PAGINATION',
  UPDATE_TRACK: 'UPDATE_TRACK',

  fetchTracksFailed: error => ({
    type: tracklistActions.FETCH_TRACKS_FAILED,
    payload: error
  }),

  fetchTracksFulfilled: (tracklistId, data) => ({
    type: tracklistActions.FETCH_TRACKS_FULFILLED,
    payload: {
      // collection: data.users,
      collection: data.websites.hits.hits._source,
      tracklistId: tracklistId
    }
  }),

  fetchTracksPending: tracklistId => ({
    type: tracklistActions.FETCH_TRACKS_PENDING,
    payload: {
      tracklistId
    }
  }),

  loadFeaturedTracks: () => ({
    type: tracklistActions.LOAD_FEATURED_TRACKS,
    payload: {
      tracklistId: FEATURED_TRACKLIST_ID,
      userId: FEATURED_TRACKLIST_USER_ID
    }
  }),

  loadNextTracks: () => ({
    type: tracklistActions.LOAD_NEXT_TRACKS
  }),

  mountTracklist: tracklistId => ({
    type: tracklistActions.MOUNT_TRACKLIST,
    payload: {
      tracklistId
    }
  }),

  updatePagination: page => ({
    type: tracklistActions.UPDATE_PAGINATION,
    payload: {
      page
    }
  }),

  updateFieldsOfItem: (entity, id, fields) => ({
    type: tracklistActions.UPDATE_TRACK,
    entity,
    id,
    fields
  })
};

export const likeTrackAction = (track_id) => {
  return{
    type: tracklistActions.LIKE_TRACK,
    id: track_id,
  }
};

export const unlikeTrackAction = (track_id) => {
  return{
    type: tracklistActions.UNLIKE_TRACK,
    id: track_id,
  }
};

export const likeTrackResultAction = (track_id, count) => {
  return{
    type: tracklistActions.LIKE_RESULT_TRACK,
    data: {track_id, count},
  }
};

export const tracklistRequestActions = {
  failed: tracklistActions.fetchTracksFailed,
  fulfilled: tracklistActions.fetchTracksFulfilled,
  pending: tracklistActions.fetchTracksPending
};
