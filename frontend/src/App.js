import React, { useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";

import TrackPage from './components/TrackPage';
import AlbumPage from './components/AlbumPage';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import ArtistPage from './components/ArtistPage';
import Navigation from './components/Navigation';
import AlbumWithTracks from './components/AlbumWithTracks';
import ArtistsWithAlbums from './components/ArtistsWithAlbums';
import HomePage from './components/HomePage';
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' >
            <HomePage />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/album'>
            <AlbumPage />
          </Route>
          <Route path='/album/:albumId'>
            <AlbumWithTracks />
          </Route>
          <Route exact path='/artist'>
            <ArtistPage />
          </Route>
          <Route path ='/artist/:artistId'>
            <ArtistsWithAlbums />
          </Route>
          <Route path='/track'>
            <TrackPage />
          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;
