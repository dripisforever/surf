import request from 'superagent';
import { API_MOVIES_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from '../constants';
// import { API_TRACKS_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from '../constants';

export const api = {
  fetch(url) {
    return dispatch({url});
  },

  fetchSearchResults(query) {
    return dispatch({
      paginate: true,
      query: `q=${query}`,
      url: API_MOVIES_URL
    });
  },
};


export function dispatch(options) {
  return request[options.method || 'get'](requestUrl(options))
    .then(response => response.body);
}

export function requestUrl({paginate, query, url}) {
  let params = [];

  if (!url.includes(CLIENT_ID_PARAM)) params.push(CLIENT_ID_PARAM);
  if (query) params.push(query);
  if (paginate) params.push(PAGINATION_PARAMS);
  if (params.length) {
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += params.join('&');
  }

  return url;
}
