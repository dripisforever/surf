import { Map } from 'immutable';
import { tracklistActions } from '../tracklists';
import { createTrack } from './track';


export function tracksReducer(state = new Map(), action) {
  switch (action.type) {
    case tracklistActions.FETCH_TRACKS_FULFILLED:
      return state.withMutations(tracks => {
        action.payload.collection.forEach(trackData => {
          tracks.set(trackData.id, createTrack(trackData));
        });
      });
    case tracklistActions.LIKE_TRACK:
      // return state.merge({
      //   'track_id': action.payload.
      //
      // });
      return {
        track_id: action.data 
      }
    case tracklistActions.LIKE_RESULT_TRACK:
      const tracks = state.get('tracks');
      const likeTrack = tracks.get(action.payload.data.track_id);
      return state.update('tracks',map => map.set(action.payload.data.track_id,
        likeTrack.set('collectionCount', Number(action.payload.data.count) + Number(likeTrack.collectionCount))));
    default:
      return state;
  }
}
