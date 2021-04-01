import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getArtist } from '../../store/artists'
import { NavLink, Link, useParams } from 'react-router-dom'
// import * as sessionActions from '../../store/session';
// import { Redirect } from 'react-router-dom';


function ArtistPage() {
  const dispatch  = useDispatch();


  // if(!sessionUser) return (
  //   <Redirect to='/login' />
  // );

  const artists = useSelector(state => state.artists);

  useEffect(() => {
    dispatch(getArtist())
  }, [dispatch]);

  const renderArtist = () => {
    return Object.values(artists).map(artist => {
      return (
        <li>
          <NavLink to={`/artist/${artist.id}`}>{artist.artistName}</NavLink>
        </li>
      )
    })
  }



  return (
    <ul>
      {renderArtist()}

    </ul>
  )
}
export default ArtistPage
