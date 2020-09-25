import React from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../img/logo.jpeg';

import {
  PageContainer
} from '../../style';

import {
  OpeningPageContainer
} from './style';

const OpeningPage = () => {

  const history = useHistory();

  const goToLoginPage = () => {
    setTimeout(() => {
      history.push('/login');
    }, 5000);
  }

  return (
    <PageContainer>
      <OpeningPageContainer>
        <img src={Logo} alt='Logo' />
        {goToLoginPage()}
      </OpeningPageContainer>
    </PageContainer>
  );
}

export default OpeningPage;