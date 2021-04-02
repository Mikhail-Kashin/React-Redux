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
  const response = await csrfFetch(`/api/artist/${id}`)
  if (!response.ok) {
    throw response
  }
  const artistAlbum = await response.json()
  dispatch(setAlbum(artistAlbum))
}

export const createAlbum = (album) => async dispatch => {
  const {name, imgUrl, artistId} = album;
  const response = await csrfFetch(`/api/albums`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      imgUrl,
      artistId
    }),
  })
  const albumData = await response.json()
  dispatch(addAlbum(albumData));
}




const initialState = {};

const albumReducer = (album = initialState, action) => {
  let newAlbum;
  switch (action.type) {
    case SET_ALBUMS:
      const albums = action.payload;
      const newAlbums = {};
      for (const album of albums) {
        newAlbums[album.id] = album;
      }
      return newAlbums
    case ADD_ALBUM:
       newAlbum = Object.assign({}, album);
       newAlbum[action.payload.id] = action.payload;
       return newAlbum;
    default:
      return album
  }
}

export default albumReducer;
