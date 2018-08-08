import { Record } from 'immutable';
import { formatTrackTitle, streamUrl, trackImageUrl, waveformUrl } from './utils';


export const Track = new Record({
  artworkUrl: null,
  duration: null,
  id: null,
  liked: null,
  disliked: null,
  viewsCount: null,
  likesCount: null,
  permalinkUrl: null,
  playbackCount: null,
  streamable: null,
  streamUrl: null,
  title: null,
  url: null,
  body: null,
  highlight: null,
  userId: null,
  username: null,
  userPermalinkUrl: null,
  waveformUrl: null
});


export function createTrack(data) {
  return new Track({

    id: data.id,
    viewsCount: data.viewsCount,
    liked: data.liked,
    disliked: data.disliked,
    username: data.username,
    title: data.title,
    body: data.body,
    highlight: data.highlight,
    url: data.url,
    // title: formatTrackTitle(data.title),


  });
}
