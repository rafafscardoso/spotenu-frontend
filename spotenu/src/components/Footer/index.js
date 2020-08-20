import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import FooterPremium from './components/FooterPremium';

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
      case 'PREMIUM':
        return <FooterPremium />
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
        profileFooter()
      : <></>}
    </FooterContainer>
  );
};

export default Footer