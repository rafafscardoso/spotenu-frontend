import React from 'react';
import { useHistory } from 'react-router';

import {
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  SearchIcon
} from '../../style';

import {
  HomeFreeContainer
} from './style';

const HomeFree = () => {

  const history = useHistory();

  return (
    <HomeFreeContainer>
    <HomeList>
      <HomeListItem button onClick={() => history.push('/search')} >
        <HomeListItemIcon>
          <SearchIcon color='secondary' />
        </HomeListItemIcon>
        <HomeListItemText primary='Busca' />
      </HomeListItem>
    </HomeList>
    </HomeFreeContainer>
  )
};

export default HomeFree;