import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
  FooterBottomNavigation,
  FooterBottomNavigationAction,
  HomeIcon,
  AlbumIcon
} from '../../style';

const FooterBand = () => {

  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(history.location.pathname);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    history.push(newValue);
  }

  return (
    <FooterBottomNavigation value={currentPage} onChange={handleChange} >
      <FooterBottomNavigationAction label='Home' value='/home' icon={<HomeIcon />} />
      <FooterBottomNavigationAction label='Album' value='/album/band' icon={<AlbumIcon />} />
    </FooterBottomNavigation>
  );
};

export default FooterBand;