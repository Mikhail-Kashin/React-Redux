import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getArtist } from '../../store/artists'
// import * as sessionActions from '../../store/session';
// import { Redirect } from 'react-router-dom';


function ArtistPage() {
  const dispatch  = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);

  // if(!sessionUser) return (
  //   <Redirect to='/login' />
  // );

  const artists = useSelector(state => state.artists);

  useEffect(() => {
    dispatch(getArtist())
  }, [dispatch]);

  const renderAlbums = () => {
    return Object.values(artists).map(artist => {
      return (
        <li>
          {artist.artistName}
        </li>
      )
    })
  }

  return (
    <ul>
      {renderAlbums()}
    </ul>
  )
}
export default ArtistPage
