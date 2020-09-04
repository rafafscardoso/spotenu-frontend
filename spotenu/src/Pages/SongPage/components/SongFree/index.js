import React from 'react';

import {
  SongPageContainer,
  SongDetailWrapper
} from '../../style';

const SongFree = (props) => {

  const { name, albumName, creatorBandName } = props.song;

  return (
    <SongPageContainer>
      <SongDetailWrapper>
        <h3>Nome: {name}</h3>
        <h4>Música: {albumName}</h4>
        <p>Artista: {creatorBandName}</p>
      </SongDetailWrapper>
    </SongPageContainer>
  )
};

export default SongFree;