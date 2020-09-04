import React from 'react';
import { useHistory } from 'react-router';

import { AlbumIcon } from '../../../../icons';

import {
  HomePageContainer,
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  HomeDivider
} from '../../style';

const HomeBand = () => {

  const history = useHistory();

  return (
    <HomePageContainer>
      <HomeList>
        <HomeListItem button onClick={() => history.push('/album/band')} >
          <HomeListItemIcon>
            <AlbumIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Álbuns' />
        </HomeListItem>
        <HomeDivider />
      </HomeList>
    </HomePageContainer>
  )
};

export default HomeBand;