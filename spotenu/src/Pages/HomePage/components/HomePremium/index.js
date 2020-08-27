import React from 'react';
import { useHistory } from 'react-router';

import {
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  HomeDivider,
  SearchIcon,
  PlaylistIcon
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
            <SearchIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Busca' />
        </HomeListItem>
        <HomeDivider />
        <HomeListItem button >
          <HomeListItemIcon>
            <PlaylistIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Playlists' />
        </HomeListItem>
      </HomeList>
    </HomePremiumContainer>
  )
};

export default HomePremium;