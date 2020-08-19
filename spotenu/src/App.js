import React, { useState } from 'react';

import Router from './Router';
import { MyTheme } from './themes';
import { AppThemeProvider } from './style';
import { ProfileContext } from './contexts';

const App = () => {

  const [profile, setProfile] = useState(undefined);

  const profileValue = { profile, setProfile };

  
  return (
    <AppThemeProvider theme={MyTheme}>
      <ProfileContext.Provider value={profileValue} >
        <Router />
      </ProfileContext.Provider>
    </AppThemeProvider>
  );
}

export default App;
