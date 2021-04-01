import { csrfFetch } from './csrf';

const SET_ARTIST = 'artist/set';

export const setArtist = (artist) => {
  return {
    type: SET_ARTIST,
    payload: artist
  }
}



//thunks
export const getArtist = () => async dispatch => {
  const response = await csrfFetch('api/artist');
  if (!response.ok) {
    throw response
  }
  const artist = await response.json()
  dispatch(setArtist(artist));
}

const initialState = {};


const artistReducer = (artist = initialState, action) => {
  switch (action.type) {
    case SET_ARTIST:
      const artists = action.payload;
      const newArtists = {};
      for (const artist of artists) {
        newArtists[artist.id] = artist;
      }
      return newArtists
    default:
      return artist
  }
}

export default artistReducer
