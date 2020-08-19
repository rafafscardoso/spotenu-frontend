import React from 'react';
import { useHistory } from 'react-router';

import { usePrivatePage } from '../../hooks';

import {
  ApproveBandPageContainer
} from './style';

const ApproveBandPage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePrivatePage();

  return (
    <ApproveBandPageContainer>
      ApproveBandPage
    </ApproveBandPageContainer>
  );
}

export default ApproveBandPage;