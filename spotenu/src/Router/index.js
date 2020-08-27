import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import OpeningPage from '../Pages/OpeningPage';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage';
import CreateAdminPage from '../Pages/CreateAdminPage';
import CreateBandPage from '../Pages/CreateBandPage';
import ApproveBandPage from '../Pages/ApproveBandPage';
import HomePage from '../Pages/HomePage';
import MusicGenrePage from '../Pages/MusicGenrePage';
import CreateAlbumPage from '../Pages/CreateAlbumPage';
import CreateSongPage from '../Pages/CreateSongPage';
import CreatePlaylistPage from '../Pages/CreatePlaylistPage';
import UpgradeToPremiumPage from '../Pages/UpgradeToPremiumPage';
import SearchPage from '../Pages/SearchPage';
import BandAlbumsPage from '../Pages/BandAlbumsPage';
import AlbumPage from '../Pages/AlbumPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={OpeningPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/create/admin' component={CreateAdminPage} />
        <Route exact path='/create/band' component={CreateBandPage} />
        <Route exact path='/approve/band' component={ApproveBandPage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/music/genre' component={MusicGenrePage} />
        <Route exact path='/create/album' component={CreateAlbumPage} />
        <Route exact path='/create/song' component={CreateSongPage} />
        <Route exact path='/create/playlist' component={CreatePlaylistPage} />
        <Route exact path='/upgrade' component={UpgradeToPremiumPage} />
        <Route exact path='/search' component={SearchPage} />
        <Route exact path='/album/band' component={BandAlbumsPage} />
        <Route exact path='/album/:albumId' component={AlbumPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;