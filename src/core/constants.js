//=========================================================
//  CONSTANTS
//---------------------------------------------------------
export const APP_NAME = 'soundcloud-redux';


//=====================================
//  API
//-------------------------------------
// export const API_BASE_URL = 'https://api.soundcloud.com';
// export const API_TRACKS_URL = `${API_BASE_URL}/tracks`;
//
// export const CLIENT_ID = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID || 'd02c42795f3bcac39f84eee0ae384b00';

//=====================================
//  API
//-------------------------------------
// export const API_BASE_URL = 'http://api.themoviedb.org/3/search';
// export const API_MOVIES_URL = `${API_BASE_URL}/movie`;
// export const API_USERS_URL = `${API_BASE_URL}/users`;
//
// export const CLIENT_ID = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID || 'b6cd56bf94f8f8f33f48689d00174b5b';
//
//
//
// export const CLIENT_ID_PARAM = `api_key=${CLIENT_ID}`;
export const API_BASE_URL = 'https://views-api.herokuapp.com/api';
// export const API_BASE_URL = 'http://views-api.herokuapp.com/api';
export const API_MOVIES_URL = `${API_BASE_URL}/users/search`;
export const API_USERS_URL = `${API_BASE_URL}/users`;

export const CLIENT_ID = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID || 'b6cd56bf94f8f8f33f48689d00174b5b';



export const CLIENT_ID_PARAM = `api_key=${CLIENT_ID}`;

export const PAGINATION_LIMIT = 10;
export const PAGINATION_PARAMS = `limit=${PAGINATION_LIMIT}&linked_partitioning=1`;


//=====================================
//  IMAGES
//-------------------------------------
export const IMAGE_DEFAULT_SIZE = 'large.jpg';
export const IMAGE_XLARGE_SIZE = 't500x500.jpg';


//=====================================
//  PLAYER
//-------------------------------------
export const PLAYER_INITIAL_VOLUME = 10;
export const PLAYER_MAX_VOLUME = 100;
export const PLAYER_VOLUME_INCREMENT = 5;

export const PLAYER_STORAGE_KEY = `${APP_NAME}:player`;


//=====================================
//  TRACKLISTS
//-------------------------------------
export const FEATURED_TRACKLIST_ID = 'featured';
export const FEATURED_TRACKLIST_USER_ID = 185676792;

export const SESSION_TRACKLIST_ID = 'session';

export const TRACKS_PER_PAGE = 5;


//=====================================
//  WAVEFORMS
//-------------------------------------
export const WAVEFORM_IMAGE_HOST = 'w1.sndcdn.com';
export const WAVEFORM_JSON_HOST = 'wis.sndcdn.com';
