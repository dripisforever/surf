// export const getTracks = (state) => {
//   return state.tracks;
// };

export const getTracks = state => state.tracks;

export function getTrackById(state, trackId) {
  return getTracks(state).get(trackId);
}
