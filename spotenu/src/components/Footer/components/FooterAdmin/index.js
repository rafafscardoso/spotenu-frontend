import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
  FooterBottomNavigation,
  FooterBottomNavigationAction,
  FooterHome,
  FooterMusic,
  FooterCreateAdmin,
  FooterUpdate,
  FooterApproveBand
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
      <FooterBottomNavigationAction label='Home' value='/home' icon={<FooterHome />} />
      <FooterBottomNavigationAction label='Music Genre' value='/music/genre' icon={<FooterMusic />} />
      <FooterBottomNavigationAction label='Create Admin' value='/create/admin' icon={<FooterCreateAdmin />} />
      <FooterBottomNavigationAction label='Approve Band' value='/approve/band' icon={<FooterApproveBand />} />
      <FooterBottomNavigationAction label='Update User' value='/upgrade' icon ={<FooterUpdate /> } />
    </FooterBottomNavigation>
  );
};

export default FooterAdmin;