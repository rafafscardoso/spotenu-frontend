import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
  FooterBottomNavigation,
  FooterBottomNavigationAction,
  FooterHome,
  FooterPlaylist,
  FooterSearch
} from '../../style';

const FooterPremium = () => {

  const [currentPage, setCurrentPage] = useState('/home');

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    history.push(newValue);
  }

  return (
    <FooterBottomNavigation value={currentPage} onChange={handleChange} >
      <FooterBottomNavigationAction label='Home' value='/home' icon={<FooterHome />} />
      <FooterBottomNavigationAction label='Playlists' value='/playlist' icon={<FooterPlaylist />} />
      <FooterBottomNavigationAction label='Search' value='/search' icon={<FooterSearch />} />
    </FooterBottomNavigation>
  )
};

export default FooterPremium;