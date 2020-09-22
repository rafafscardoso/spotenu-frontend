import React from 'react';
import { useHistory } from 'react-router';

import { PlaylistIcon } from '../../../../icons';
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

const HomePremium = () => {

  const history = useHistory();

  return (
    <HomePageContainer>
      <PageList>
        <PageListItem button onClick={() => history.push('/playlist/user')} >
          <PageListItemIcon>
            <PlaylistIcon color='secondary' />
          </PageListItemIcon>
          <PageListItemText primary='Minhas Playlists' />
        </PageListItem>
        <PageDivider />
        <PageListItem button onClick={() => history.push('/playlist/public')} >
          <PageListItemIcon>
            <PlaylistIcon color='secondary' />
          </PageListItemIcon>
          <PageListItemText primary='Playlists Públicas' />
        </PageListItem>
        <PageDivider />
      </PageList>
    </HomePageContainer>
  )
};

export default HomePremium;