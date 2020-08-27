import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import ProfileAvatar from './components/ProfileAvatar';

import { ProfileContext } from '../../contexts';

import {
  HeaderContainer,
  HeaderArrowBack,
  HeaderDivider
} from './style';

const Header = () => {

  const history = useHistory();

  const [hasBackButton, setHasBackButton] = useState(true);

  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    const location = history.location.pathname;
    if (location === '/login' || location === '/home' || location === '/') {
      setHasBackButton(false);
    }
  }, [history.location.pathname]);

  return (
    <HeaderContainer>
      <div>
        <div>
          {hasBackButton ? 
            <HeaderArrowBack 
              color='primary' 
              onClick={() => history.goBack()}
            />
          : <></>}
        </div>
        <div>
          logo
        </div>
        {profile ? 
          <ProfileAvatar />
        : <></>}
      </div>
    </HeaderContainer>
  );
}

export default Header;