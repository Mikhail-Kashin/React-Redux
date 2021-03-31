import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAlbum } from '../../store/albums'
// import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';


function AlbumPage() {
  const dispatch  = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  // if(!sessionUser) return (
  //   <Redirect to='/login' />
  // );

  const albums = useSelector(state => state.albums);
  // console.log('---------------------->',albums)

  useEffect(() => {
    dispatch(getAlbum())
  }, [dispatch]);

  const renderAlbums = () => {
    return Object.values(albums).map(album => {
      return (
        <li>{album.name} Test</li>
      )
    })
  }

  return (
    <ul>
      {renderAlbums()}
    </ul>
  )
}

export default AlbumPage
