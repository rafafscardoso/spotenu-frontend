import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
  FooterBottomNavigation,
  FooterBottomNavigationAction,
  HomeIcon,
  MusicIcon,
  AdminIcon,
  UpdateIcon,
  ApproveIcon
} from '../../style';

const FooterAdmin = () => {

  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(history.location.pathname);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    history.push(newValue);
  }

  return (
    <FooterBottomNavigation value={currentPage} onChange={handleChange} >
      <FooterBottomNavigationAction label='Home' value='/home' icon={<HomeIcon />} />
      <FooterBottomNavigationAction label='Music Genre' value='/music/genre' icon={<MusicIcon />} />
      <FooterBottomNavigationAction label='Create Admin' value='/create/admin' icon={<AdminIcon />} />
      <FooterBottomNavigationAction label='Approve Band' value='/approve/band' icon={<ApproveIcon />} />
      <FooterBottomNavigationAction label='Update User' value='/upgrade' icon ={<UpdateIcon /> } />
    </FooterBottomNavigation>
  );
};

export default FooterAdmin;