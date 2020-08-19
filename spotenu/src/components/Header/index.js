import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import ProfileAvatar from '../ProfileAvatar';

import {
  HeaderContainer,
  HeaderArrowBack
} from './style';

const Header = () => {

  const history = useHistory();

  const [hasBackButton, setHasBackButton] = useState(true);

  const token = window.localStorage.getItem('accessToken');

  useEffect(() => {
    const location = history.location.pathname;
    if (location === '/login' || location === '/home' || location === '/') {
      setHasBackButton(false);
    }
  }, [history.location.pathname]);

  return (
    <HeaderContainer>
      <div>
        {hasBackButton ? 
          <HeaderArrowBack 
            color='primary' 
            onClick={() => history.goBack()}
          />
        : <></>}
      </div>
      <div>
        {token ? <ProfileAvatar /> : <></>}
      </div>
    </HeaderContainer>
  );
}

export default Header;