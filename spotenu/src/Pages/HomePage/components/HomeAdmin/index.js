import React from 'react';
import { useHistory } from 'react-router';

import { MusicIcon, AdminIcon, ApproveIcon, PaymentIcon } from '../../../../icons';

import {
  HomePageContainer,
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  HomeDivider,
} from '../../style';

const HomeAdmin = () => {

  const history = useHistory();

  return (
    <HomePageContainer>
      <HomeList>
        <HomeListItem button onClick={() => history.push('/music/genre')} >
          <HomeListItemIcon>
            <MusicIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Gêneros musicais' />
        </HomeListItem>
        <HomeDivider />
        <HomeListItem button onClick={() => history.push('/create/admin')} >
          <HomeListItemIcon>
            <AdminIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Criar um administrador' />
        </HomeListItem>
        <HomeDivider />
        <HomeListItem button onClick={() => history.push('/approve/band')} >
          <HomeListItemIcon>
            <ApproveIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Aprovar uma banda' />
        </HomeListItem>
        <HomeDivider />
        <HomeListItem button onClick={() => history.push('/update')} >
          <HomeListItemIcon>
            <PaymentIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Tornar um usuário free em um premium' />
        </HomeListItem>
        <HomeDivider />
      </HomeList>
    </HomePageContainer>
  )
};

export default HomeAdmin;