import React from 'react';
import { useHistory } from 'react-router';

import { AlbumIcon } from '../../../../icons';
import {
  PageList,
  PageListItem,
  PageListItemIcon,
  PageListItemText,
  PageDivider
} from '../../../../style';

import {
  HomePageContainer
} from '../../style';

const HomeBand = () => {

  const history = useHistory();

  return (
    <HomePageContainer>
      <PageList>
        <PageListItem button onClick={() => history.push('/album/band')} >
          <PageListItemIcon>
            <AlbumIcon color='secondary' />
          </PageListItemIcon>
          <PageListItemText primary='Meus Álbuns' />
        </PageListItem>
        <PageDivider />
      </PageList>
    </HomePageContainer>
  )
};

export default HomeBand;