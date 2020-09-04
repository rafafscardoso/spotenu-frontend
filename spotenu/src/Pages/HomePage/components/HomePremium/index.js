import React from 'react';
import { useHistory } from 'react-router';

import { SearchIcon, PlaylistIcon } from '../../../../icons';

import {
  HomePageContainer,
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  HomeDivider
} from '../../style';

const HomePremium = () => {

  const history = useHistory();

  return (
    <HomePageContainer>
      <HomeList>
        <HomeListItem button onClick={() => history.push('/search')} >
          <HomeListItemIcon>
            <SearchIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Busca' />
        </HomeListItem>
        <HomeDivider />
        <HomeListItem button onClick={() => history.push('/playlist/user')} >
          <HomeListItemIcon>
            <PlaylistIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Playlists' />
        </HomeListItem>
        <HomeDivider />
      </HomeList>
    </HomePageContainer>
  )
};

export default HomePremium;