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
import UpgradeToPremiumPage from '../Pages/UpgradeToPremiumPage';
import SearchPage from '../Pages/SearchPage';
import BandAlbumsPage from '../Pages/BandAlbumsPage';
import AlbumPage from '../Pages/AlbumPage';
import ProfilePage from '../Pages/ProfilePage';
import UserPlaylistsPage from '../Pages/UserPlaylistsPage';
import PlaylistPage from '../Pages/PlaylistPage';
import SongPage from '../Pages/SongPage';
import GenreSongsPage from '../Pages/GenreSongsPage';

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
        <Route exact path='/upgrade' component={UpgradeToPremiumPage} />
        <Route exact path='/search' component={SearchPage} />
        <Route exact path='/album/band' component={BandAlbumsPage} />
        <Route exact path='/album/:albumId' component={AlbumPage} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/playlist/user' component={UserPlaylistsPage} />
        <Route exact path='/playlist/:playlistId' component={PlaylistPage} />
        <Route exact path='/song/:songId' component={SongPage} />
        <Route exact path='/genre/:genreId' component={GenreSongsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;