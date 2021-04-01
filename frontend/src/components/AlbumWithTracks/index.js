import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useParams } from 'react-router-dom'
import { getTrackByAlbumId, getTrack } from '../../store/tracks'



function AlbumTrackPage() {
  const dispatch = useDispatch();
  const {albumId} = useParams();
  const albums = useSelector(state => state.albums)
  const tracks = useSelector(state => state.tracks)
  // console.log('---------->',albums)
  console.log('---------->',albums)


  useEffect(() => {
    dispatch(getTrackByAlbumId(albumId))
  }, [dispatch, albumId])




  const renderAlbumTracks = () => {
    return Object.values(tracks).map(track => {
      return (
        <li>
          {track.name}
        </li>
      )
    })
  }

  return (
    <div>
      {renderAlbumTracks()}
    </div>
  )

}


export default AlbumTrackPage
