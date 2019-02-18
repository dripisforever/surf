import { call, fork, put, select, takeLatest, takeEvery, take } from 'redux-saga/effects';
import { fetchNextTracks } from '../api';
import { tracklistActions, likeEntryResultAction, updateFieldsOfItem } from './actions';
import { getCurrentTracklist } from './selectors';
import { getTracks } from '../tracks/selectors';
import { likeTrack, unlikeTrack } from '../api/api-service';
import { LIKE_TRACK, UNLIKE_TRACK } from './actions';
// import { likePhoto } from './';


export function* loadNextTracks() {
  const tracklist = yield select(getCurrentTracklist);
  if (tracklist.hasNextPageInStore) {
    yield put(tracklistActions.updatePagination(tracklist.currentPage + 1));
  }
  else if (tracklist.nextUrl) {
    yield call(fetchNextTracks, tracklist.id, tracklist.nextUrl);
  }
}

/**
 * like photo flow
 */
export function* likePhotoF() {
  while (true) {
    const { id } = yield take(LIKE_TRACK);
    const { response, error } = yield call(likeTrack, id);
    if (response) {
      //TODO: show feedback
      yield put(tracklistActions.updateFieldsOfItem('photos', id, response.photo));
    } else {
      console.log("ERROR");
      // yield fork(handleCommonErr, error, LIKE_PHOTO, { id });
    }
  }
}

export function* unLikePhotoF() {
  while (true) {
    const { id } = yield take(UNLIKE_TRACK);
    const { response, error } = yield call(unlikeTrack, id);
    if (response) {
      yield put(tracklistActions.updateFieldsOfItem('photos', id, response.photo));
    } else {
      console.log("ERROR");
      // yield fork(handleCommonErr, error, UNLIKE_TRACK, { id });
    }
  }
}



//=====================================
//  WATCHERS
//-------------------------------------

export function* watchLoadNextTracks() {
  yield [
    // takeEvery(tracklistActions.LIKE_TRACK, likeTrackAsync),
    takeEvery(tracklistActions.LIKE_TRACK, likePhotoF),
    takeEvery(tracklistActions.UNLIKE_TRACK, unLikePhotoF),
    takeLatest(tracklistActions.LOAD_NEXT_TRACKS, loadNextTracks)

  ];
}


//=====================================
//  ROOT
//-------------------------------------

export const tracklistSagas = [
  fork(watchLoadNextTracks)
];
