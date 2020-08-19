import React from 'react';
import { useHistory } from 'react-router';

import { usePrivatePage } from '../../hooks';

import {
  CreatePlaylistPageContainer
} from './style';

const CreatePlaylistPage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePrivatePage();

  return (
    <CreatePlaylistPageContainer>
      CreatePlaylistPage
    </CreatePlaylistPageContainer>
  );
}

export default CreatePlaylistPage;