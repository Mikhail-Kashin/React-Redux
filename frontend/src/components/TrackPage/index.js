import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTrack } from '../../store/tracks'
// import * as sessionActions from '../../store/session';
// import { Redirect } from 'react-router-dom';

function TrackPage() {
  const dispatch  = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);

  // if(!sessionUser) return (
  //   <Redirect to='/login' />
  // );.

  const tracks = useSelector(state => state.tracks);
  // console.log('-------------->',tracks)


  useEffect(() => {
    dispatch(getTrack())
  }, [dispatch]);

  const renderTracks = () => {
    return Object.values(tracks).map(track =>{
      return (
        <li>{track.name} tester</li>
      )
    })
  }

  return (
    <ul>
      {renderTracks()}
    </ul>
  )
}

export default TrackPage
