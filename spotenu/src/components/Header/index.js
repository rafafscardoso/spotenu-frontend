import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import { ProfileContext } from '../../contexts';
import { ArrowBackIcon } from '../../icons';
import {
  FormIconButton
} from '../../style'

import {
  HeaderContainer,
  HeaderAvatar,
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

  const avatar = () => {
    const splittedName = profile.name.split(' ');
    if (splittedName.length > 1) {
      return `${splittedName[0].charAt(0)}${splittedName[splittedName.length - 1].charAt(0)}`;
    }
    return profile.name.charAt(0);
  }

  return (
    <HeaderContainer>
      <div>
        <div>
          {hasBackButton &&
            <FormIconButton onClick={() => history.goBack()} >
              <ArrowBackIcon color='primary' />
            </FormIconButton>
          }
        </div>
        <div>
          {profile &&
            <HeaderAvatar >{avatar()}</HeaderAvatar>
          }
        </div>
      </div>
      {(hasBackButton || profile) && <HeaderDivider />}
    </HeaderContainer>
  );
}

export default Header;