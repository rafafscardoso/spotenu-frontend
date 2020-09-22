import React, { useState } from 'react';

import Router from './Router';
import { MyTheme } from './themes';
import { ProfileContext, PlaylistContext, GenreContext, AlbumContext } from './contexts';
import { AppThemeProvider } from './style';

const App = () => {

  const [profile, setProfile] = useState(undefined);
  const [playlists, setPlaylists] = useState(undefined);
  const [musicGenres, setMusicGenres] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  
  return (
    <AppThemeProvider theme={MyTheme}>
      <ProfileContext.Provider value={{ profile, setProfile }} >
        <PlaylistContext.Provider value={{ playlists, setPlaylists }} >
          <GenreContext.Provider value={{ musicGenres, setMusicGenres }} >
            <AlbumContext.Provider value={{ albums, setAlbums }} >
              <Router />
            </AlbumContext.Provider>
          </GenreContext.Provider>
        </PlaylistContext.Provider>
      </ProfileContext.Provider>
    </AppThemeProvider>
  );
}

export default App;
