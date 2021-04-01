import { csrfFetch } from './csrf';

const SET_ALBUMS = 'album/set';
const ADD_ALBUM = 'album/add';

export const setAlbum = (album) => {
  return {
    type: SET_ALBUMS,
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
  const response = await csrfFetch('/api/albums');
  if (!response.ok) {
    throw response
  }
  const album = await response.json()
  dispatch(setAlbum(album));
}

export const getAlbumsByArtistId = (id) => async dispatch => {
  console.log('.....>',id)
  const response = await csrfFetch(`/api/artist/${id}`)
  if (!response.ok) {
    throw response
  }
  const artistAlbum = await response.json()
  dispatch(setAlbum(artistAlbum))
}



const initialState = {};

const albumReducer = (album = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
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
