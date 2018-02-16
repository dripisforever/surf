import request from 'superagent';
import { API_SEARCH_WEBSITES, API_MOVIES_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from '../constants';
// import { API_TRACKS_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from '../constants';

export const api = {
  fetch(url) {
    return dispatch({url});
  },

  fetchSearchResults(query, pageNum) {
    return dispatch({
      paginate: true,
      query: `q=${query}`,
      url: API_SEARCH_WEBSITES,
      // page: `page=${pageNum}`
      page: pageNum
    });
  },
  //
  // fetchUser(username) {
  //   return dispatch({
  //     url: `${API_USERS_URL}/${username}/public_profile`
  //   });
  // },
};


export function dispatch(options) {
  return request[options.method || 'get'](requestUrl(options))
    .then(response => response.body);
}

export function requestUrl({paginate, query, url, page}) {
  let params = [];

  // if (!url.includes(CLIENT_ID_PARAM)) params.push(CLIENT_ID_PARAM);
  if (query) params.push(query);
  // if (paginate) params.push(PAGINATION_PARAMS);
  if (page) params.push(`page=${page}`)
  if (params.length) {
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += params.join('&');
  }

  return url;
}
