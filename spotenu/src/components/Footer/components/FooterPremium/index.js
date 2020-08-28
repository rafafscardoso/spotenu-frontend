import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
  FooterBottomNavigation,
  FooterBottomNavigationAction,
  HomeIcon,
  PlaylistIcon,
  SearchIcon
} from '../../style';

const FooterPremium = () => {

  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(history.location.pathname);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    history.push(newValue);
  }

  return (
    <FooterBottomNavigation value={currentPage} onChange={handleChange} >
      <FooterBottomNavigationAction label='Home' value='/home' icon={<HomeIcon />} />
      <FooterBottomNavigationAction label='Playlists' value='/playlist' icon={<PlaylistIcon />} />
      <FooterBottomNavigationAction label='Search' value='/search' icon={<SearchIcon />} />
    </FooterBottomNavigation>
  )
};

export default FooterPremium;