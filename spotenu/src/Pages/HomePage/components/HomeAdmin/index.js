import React from 'react';
import { useHistory } from 'react-router';

import { MusicIcon, AdminIcon, ApproveIcon, PaymentIcon } from '../../../../icons';
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

const HomeAdmin = () => {

  const history = useHistory();

  return (
    <HomePageContainer>
      <PageList>
        <PageListItem button onClick={() => history.push('/music/genre')} >
          <PageListItemIcon>
            <MusicIcon color='secondary' />
          </PageListItemIcon>
          <PageListItemText primary='Gêneros musicais' />
        </PageListItem>
        <PageDivider />
        <PageListItem button onClick={() => history.push('/create/admin')} >
          <PageListItemIcon>
            <AdminIcon color='secondary' />
          </PageListItemIcon>
          <PageListItemText primary='Criar um administrador' />
        </PageListItem>
        <PageDivider />
        <PageListItem button onClick={() => history.push('/approve/band')} >
          <PageListItemIcon>
            <ApproveIcon color='secondary' />
          </PageListItemIcon>
          <PageListItemText primary='Aprovar uma banda' />
        </PageListItem>
        <PageDivider />
        <PageListItem button onClick={() => history.push('/upgrade')} >
          <PageListItemIcon>
            <PaymentIcon color='secondary' />
          </PageListItemIcon>
          <PageListItemText primary='Tornar um usuário premium' />
        </PageListItem>
        <PageDivider />
      </PageList>
    </HomePageContainer>
  )
};

export default HomeAdmin;