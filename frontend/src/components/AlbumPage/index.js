import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useParams } from 'react-router-dom'
import { getAlbum } from '../../store/albums'
// import * as sessionActions from '../../store/session';
// import { Redirect } from 'react-router-dom';


function AlbumPage() {
  const dispatch  = useDispatch();

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
        <li>
          {/* <link to={`/${album.id}/${track.id}`}>{album.name}</link> */}
          <NavLink to={`/album/${album.id}`}>{album.name}</NavLink>
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

export default AlbumPage
