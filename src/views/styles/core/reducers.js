import { combineReducers } from 'redux';

import { searchReducer } from './search';
import { tracksReducer } from './tracks';
import { tracklistsReducer } from './tracklists';


export default combineReducers({

  search: searchReducer,
  tracks: tracksReducer,
  tracklists: tracklistsReducer
});
