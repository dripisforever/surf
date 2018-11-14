import { call, fork, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { fetchNextTracks } from '../api';
import { tracklistActions, likeEntryResultAction } from './actions';
import { getCurrentTracklist } from './selectors';
import { getTracks } from '../tracks/selectors';
import { likeTrack } from '../api/api-service';
import { LIKE_TRACK } from './actions';


export function* loadNextTracks() {
  const tracklist = yield select(getCurrentTracklist);
  if (tracklist.hasNextPageInStore) {
    yield put(tracklistActions.updatePagination(tracklist.currentPage + 1));
  }
  else if (tracklist.nextUrl) {
    yield call(fetchNextTracks, tracklist.id, tracklist.nextUrl);
  }
}

export function* likeTrackAsync() {
  const tracks = yield select(getTracks);
  const track_id = tracks.get('track_id');
  const token = localStorage.getItem('token');
  const json = yield call(likeTrack, track_id, token);
  if (json.success) {
    console.log('likeEntryAsyncSuccess', json.data);
    const count = json.data === 1 ? 1 : -1;
    // yield put(likeEntryResultAction(eid, count));
  } else {
    console.log('likeEntryAsyncError', json.error);
  }
}


//=====================================
//  WATCHERS
//-------------------------------------

export function* watchLoadNextTracks() {
  yield [
    takeEvery(tracklistActions.LIKE_TRACK, likeTrackAsync),
    takeLatest(tracklistActions.LOAD_NEXT_TRACKS, loadNextTracks)

  ];
}


//=====================================
//  ROOT
//-------------------------------------

export const tracklistSagas = [
  fork(watchLoadNextTracks)
];
