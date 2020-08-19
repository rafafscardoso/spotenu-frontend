import React from 'react';
import { useHistory } from 'react-router';

import { usePrivatePage } from '../../hooks';

import {
  CreateSongPageContainer
} from './style';

const CreateSongPage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePrivatePage();

  return (
    <CreateSongPageContainer>
      CreateSongPage
    </CreateSongPageContainer>
  );
}

export default CreateSongPage;