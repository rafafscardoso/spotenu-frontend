import React, { useState } from 'react';

import Router from './Router';
import { MyTheme } from './themes';
import { useForm } from './hooks';
import { ProfileContext, QueryContext, BrowseContext, GenreContext } from './contexts';
import { AppThemeProvider } from './style';

const App = () => {

  const { form, onChange, resetForm } = useForm({
    query: ''
  });

  const [profile, setProfile] = useState(undefined);
  const [querySongs, setQuerySongs] = useState(undefined);
  const [queryCount, setQueryCount] = useState(0);
  const [queryPage, setQueryPage] = useState(1);
  const [browseSongs, setBrowseSongs] = useState(undefined);
  const [browseCount, setBrowseCount] = useState(0);
  const [browsePage, setBrowsePage] = useState(1);
  const [musicGenres, setMusicGenres] = useState(undefined);

  const profileValue = { profile, setProfile };
  const queryValue = { querySongs, setQuerySongs, queryCount, setQueryCount, queryPage, setQueryPage, form, onChange, resetForm };
  const browseValue = { browseSongs, setBrowseSongs, browseCount, setBrowseCount, browsePage, setBrowsePage };
  const genreValue = { musicGenres, setMusicGenres };
  
  return (
    <AppThemeProvider theme={MyTheme}>
      <ProfileContext.Provider value={profileValue} >
        <QueryContext.Provider value={queryValue} >
          <BrowseContext.Provider value={browseValue} >
            <GenreContext.Provider value={genreValue} >
              <Router />
            </GenreContext.Provider>
          </BrowseContext.Provider>
        </QueryContext.Provider>
      </ProfileContext.Provider>
    </AppThemeProvider>
  );
}

export default App;
