import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ProfileContext } from '../../contexts';
import { HomeOutIcon, SearchOutIcon, ProfileOutIcon } from '../../icons';

import {
  FooterContainer,
  FooterBottomNavigation,
  FooterBottomNavigationAction
} from './style';

const Footer = () => {

  const { profile } = useContext(ProfileContext);

  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(history.location.pathname);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    history.push(newValue);
  }

  return (
    <FooterContainer>
      {profile && (
        <FooterBottomNavigation value={currentPage} onChange={handleChange} showLabels >
          <FooterBottomNavigationAction label='Home' value='/home' icon={<HomeOutIcon />} />
          {(profile.role.toLowerCase() === 'free' || profile.role.toLowerCase() === 'premium') && (
            <FooterBottomNavigationAction label='Search' value='/search' icon={<SearchOutIcon />} />
          )}
          <FooterBottomNavigationAction label='Profile' value='/profile' icon={<ProfileOutIcon />} />
        </FooterBottomNavigation>
      )}
    </FooterContainer>
  );
};

export default Footer