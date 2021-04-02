import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useParams } from 'react-router-dom'
import { getAlbum } from '../../store/albums'
// import * as sessionActions from '../../store/session';
// import { Redirect } from 'react-router-dom';

import './AlbumPage.css'


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
      console.log('---------------------->', album.artistId)
      return (
        <div className='allAlbums'>
          {/* <link to={`/${album.id}/${track.id}`}>{album.name}</link> */}
          <NavLink to={`/artist/${album.artistId}`}><img src={album.imgUrl} alt="" className='albumPic'></img></NavLink>
          <NavLink to={`/album/${album.id}`} className='albumLinkAlbumPage' ><span className='albumNameAlbumPage'>{album.name}</span> </NavLink>
        </div>
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
