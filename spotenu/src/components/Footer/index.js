import React, { useContext } from 'react';

import FooterPremium from './components/FooterPremium';
import FooterAdmin from './components/FooterAdmin';
import FooterFree from './components/FooterFree';
import FooterBand from './components/FooterBand';

import { ProfileContext } from '../../contexts';

import {
  FooterContainer
} from './style';

const Footer = () => {

  const { profile } = useContext(ProfileContext);

  const profileFooter = () => {
    switch (profile.role) {
      case 'ADMIN':
        return <FooterAdmin />
      case 'BAND':
        return <FooterBand />
      case 'PREMIUM':
        return <FooterPremium />
      default :
        return <FooterFree />
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