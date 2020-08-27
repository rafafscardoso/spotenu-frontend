import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
  FooterBottomNavigation,
  FooterBottomNavigationAction
} from '../../style';

const FooterBand = () => {

  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(history.location.pathname);

  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
    history.push(newValue);
  }

  return (
    <FooterBottomNavigation>
      <FooterBottomNavigationAction />
    </FooterBottomNavigation>
  );
};

export default FooterBand;