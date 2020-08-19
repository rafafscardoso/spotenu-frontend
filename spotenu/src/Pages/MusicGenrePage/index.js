import React from 'react';
import { useHistory } from 'react-router';

import { usePrivatePage } from '../../hooks';

import {
  MusicGenrePageContainer
} from './style';

const MusicGenrePage = () => {

  const device = `${navigator.platform}.${navigator.appCodeName}`;

  usePrivatePage();

  return (
    <MusicGenrePageContainer>
      MusicGenrePage
    </MusicGenrePageContainer>
  );
}

export default MusicGenrePage;