import React from 'react';
import { useHistory } from 'react-router';

import { usePrivatePage } from '../../hooks';

import {
  UpdateToPremiumPageContainer
} from './style';

const UpdateToPremiumPage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePrivatePage();

  return (
    <UpdateToPremiumPageContainer>
      UpdateToPremiumPage
    </UpdateToPremiumPageContainer>
  );
}

export default UpdateToPremiumPage;