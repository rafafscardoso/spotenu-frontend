import React from 'react';
import { useHistory } from 'react-router';

import { usePublicPage } from '../../hooks';

import {
  OpeningPageContainer
} from './style';

const OpeningPage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePublicPage();

  const history = useHistory();

  const goToLoginPage = setTimeout(() => {
    history.push('/login');
  }, 5000);

  return (
    <OpeningPageContainer>
      OpeningPage
    </OpeningPageContainer>
  );
}

export default OpeningPage;