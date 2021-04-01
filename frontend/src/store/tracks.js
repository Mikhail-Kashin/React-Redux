import { csrfFetch } from './csrf';

const SET_TRACK = 'track/set';
const ADD_TRACK = 'track/add';

const SET_TRACK_ID = 'track/set/id'

// export const SetTrackId = (track) => {
//   return {
//     type: SET_TRACK_ID,
//     payload: track
//   }
// }

export const setTrack = (track) => {
  return {
    type: SET_TRACK,
    payload: track
  }
}

export const addTrack = (track) => {
  return {
    type: ADD_TRACK,
    payload: track
  }
}


//thunks
export const getTrack = () => async dispatch => {
  const response = await csrfFetch('/api/track');
  if (!response.ok) {
    throw response
  }
  const track = await response.json()
  dispatch(setTrack(track));
}

export const getTrackByAlbumId = (id) => async dispatch => {
  const response = await csrfFetch(`/api/albums/${id}`)
  if (!response.ok) {
    throw response
  }
  const albumTrack = await response.json()
  // console.log('test3333333333333333',albumTrack)
  dispatch(setTrack(albumTrack))
}

const initialState = {};

const trackReducer = (track = initialState, action) => {
  switch (action.type) {
    // case SET_TRACK_ID:
    //     const trackId = action.payload;
    //     const newTrackId = {};
    //     for (const track of trackId) {
    //       newTrackId[track.id] = track;
    //     }
    //   return newTrackId;
    case SET_TRACK:
      const tracks = action.payload;
      const newTracks = {};
      for (const track of tracks) {
        newTracks[track.id] = track;
      }
      console.log('4444test',newTracks)
      return newTracks
    case ADD_TRACK:
      return
    default:
      return track
  }
}

export default trackReducer;
