import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useParams } from 'react-router-dom'
import { getAlbumsByArtistId } from '../../store/albums'


function ArtistAlbumPage() {
  const dispatch = useDispatch();
  const {artistId} = useParams();
  const albums = useSelector(state => state.albums)
  const sessionUser = useSelector(state => state.session.user);
  // const tracks = useSelector(state => state.tracks)
  console.log('---------->',albums)



  useEffect(() => {
    dispatch(getAlbumsByArtistId(artistId))
  }, [dispatch, artistId])




  const renderArtistAlbums = () => {
    return Object.values(albums).map(album => {
      return (
        <li>
          <NavLink to={`/album/${album.id}`}>{album.name}</NavLink>
        </li>
      )
    })
  }

  const renderNewAlbumForm = () => {
    if (sessionUser){
      return (
        <div>
          <form>
            <label>
              New Album Name
              <input
              type='text'
              placeholder="New Album Name"
              required
              />
            </label>
            <label>
              Album Picture
              <input
              type='file'
              />
            </label>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )
    }
  }
  const renderNewTrack = () => {
    if (sessionUser){
      return (
        <div>
          <form>
            <label>
              New Track Name
              <input
              type='text'
              required
              />
            </label>
            <label>
              Album Associated With?
              <input
              type='text'
              required
              />
            </label>
            <label>
              Upload Song
              <input
              type='file'
              />
            </label>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )
    }
  }

  return (
    <div>
      {renderArtistAlbums()}
      {renderNewAlbumForm()}
      {renderNewTrack()}
    </div>
  )

}

export default ArtistAlbumPage;
