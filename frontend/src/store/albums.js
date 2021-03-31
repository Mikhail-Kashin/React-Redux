import { csrfFetch } from './csrf';

const SET_ALBUM = 'album/set';
const ADD_ALBUM = 'album/add';

export const setAlbum = (album) => {
  return {
    type: SET_ALBUM,
    payload: album
  }
}

export const addAlbum = (album) => {
  return {
    type: ADD_ALBUM,
    payload: album
  }
}

//thunks
export const getAlbum = () => async dispatch => {
  const response = await csrfFetch('api/album');
  if (!response.ok) {
    throw response
  }
  const album = await response.json()
  dispatch(setAlbum(album));
}



const initialState = {};

const albumReducer = (album = initialState, action) => {
  switch (action.type) {
    case SET_ALBUM:
      const albums = action.payload;
      const newAlbums = {};
      for (const album of albums) {
        newAlbums[album.id] = album;
      }
      return newAlbums
    case ADD_ALBUM:
      return
    default:
      return album
  }
}

export default albumReducer;
