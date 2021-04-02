import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getAlbumsByArtistId } from '../../store/albums'
import * as albumActions from '../../store/albums'

import './ArtistsWithAlbums.css'


function ArtistAlbumPage() {
  const dispatch = useDispatch();
  const {artistId} = useParams();
  const albums = useSelector(state => state.albums)
  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    dispatch(getAlbumsByArtistId(artistId))
  }, [dispatch, artistId])


  const handleSubmitNewAlbum = (e) => {
    e.preventDefault();
    const artistId = sessionUser.id
     dispatch(albumActions.createAlbum({ name, imgUrl, artistId }))
     clearFields()
    }



  const renderArtistAlbums = () => {
    return Object.values(albums).map(album => {
      return (
        <div className='artistAlbumWrapper'>
          <div className="albums">
              <img src={album.imgUrl} className='albumPic'></img>
            <NavLink  to={`/album/${album.id}`} className='albumLink'><span className='albumName'>{album.name}</span></NavLink>
          </div>
        </div>
      )
    })
  }

  const clearFields = () => {
    setName('')
    setImgUrl('')
  }

  const renderNewAlbumForm = () => {
    if (sessionUser){
      return (
        <div >
          <form onSubmit={handleSubmitNewAlbum} className='newAlbumForm'>
            <label>
              New Album Name
              <input
              id='A'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Submit Album Name"
              required
              />
            </label>
            <label>
              Album Picture URL
              <input
              id='B'
              type='text'
              placeholder="Submit Picture URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              />
            </label>
            <button type='submit' className='btnNewAlbum'>Submit</button>
          </form>
        </div>
      )
    }
  }
  // const renderNewTrack = () => {
  //   if (sessionUser){
  //     return (
  //       <div>
  //         <form>
  //           <label>
  //             New Track Name
  //             <input
  //             type='text'
  //             required
  //             />
  //           </label>
  //           <label>
  //             Album Associated With?
  //             <input
  //             type='text'
  //             required
  //             />
  //           </label>
  //           <label>
  //             Upload Song
  //             <input
  //             type='file'
  //             />
  //           </label>
  //           <button type='submit'>Submit</button>
  //         </form>
  //       </div>
  //     )
  //   }
  // }

  return (
    <div style={{marginTop: '40px'}} className='ArtistWrap'>
      <span className='ArtistAlbumPage'>{renderArtistAlbums()}</span>
        <span>{renderNewAlbumForm()}</span>
        {/* {renderNewTrack()} */}
    </div>
    )

}

export default ArtistAlbumPage;
