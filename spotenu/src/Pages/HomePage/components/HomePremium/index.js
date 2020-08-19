import React from 'react';
import { useHistory } from 'react-router';

import {
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  HomeDivider,
  HomeSearch,
  HomeLibraryMusic
} from '../../style';

import {
  HomePremiumContainer
} from './style';

const HomePremium = () => {

  const history = useHistory();

  return (
    <HomePremiumContainer>
      <HomeList>
        <HomeListItem button onClick={() => history.push('/search')} >
          <HomeListItemIcon>
            <HomeSearch color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Busca' />
        </HomeListItem>
        <HomeDivider />
        <HomeListItem button >
          <HomeListItemIcon>
            <HomeLibraryMusic color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Playlists' />
        </HomeListItem>
      </HomeList>
    </HomePremiumContainer>
  )
};

export default HomePremium;