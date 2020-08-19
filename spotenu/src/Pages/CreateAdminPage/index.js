import React from 'react';
import { useHistory } from 'react-router';

import { usePrivatePage } from '../../hooks';

import {
  CreateAdminPageContainer
} from './style';

const CreateAdminPage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePrivatePage();

  return (
    <CreateAdminPageContainer>
      CreateAdminPage
    </CreateAdminPageContainer>
  );
}

export default CreateAdminPage;