import React from 'react';
import { useHistory } from 'react-router';

import { SearchIcon } from '../../../../icons';

import {
  HomePageContainer,
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  HomeDivider
} from '../../style';

const HomeFree = () => {

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
      </HomeList>
    </HomePageContainer>
  )
};

export default HomeFree;