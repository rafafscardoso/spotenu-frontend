import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import { ProfileContext } from '../../contexts';

import {
  FooterContainer,
  FooterButton,
  FooterHome,
  FooterProfile,
  FooterSearch,
  FooterAlbum
} from './style';

const Footer = () => {

  const { profile } = useContext(ProfileContext);

  const history = useHistory();

  const currentPage = history.location.pathname;

  const profileFooter = () => {
    switch (profile.role) {
      case 'ADMIN':
        // return <FooterAdmin />
      case 'BAND':
        return (
          <FooterButton size='large' >
            <FooterAlbum color={(currentPage === '/album/band') ? 'primary' : 'secondary'} />
          </FooterButton>
        )
      default :
        return (
          <FooterButton size='large' onClick={() => history.push('/search')} >
            <FooterSearch color={(currentPage === '/search') ? 'primary' : 'secondary'} />
          </FooterButton>
        )
    }
  }

  return (
    <FooterContainer>
      {profile ?
      <div>
        <FooterButton size='large' onClick={() => history.push('/home')} >
          <FooterHome color={(currentPage === '/home') ? 'primary' : 'secondary'} />
        </FooterButton>
        {profileFooter()}
        <FooterButton size='large' onClick={() => history.push('/profile')} >
          <FooterProfile color={(currentPage === '/profile') ? 'primary' : 'secondary'} />
        </FooterButton> 
      </div>
      : <></>}
    </FooterContainer>
  );
};

export default Footer