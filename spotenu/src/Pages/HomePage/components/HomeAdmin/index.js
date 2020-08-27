import React from 'react';
import { useHistory } from 'react-router';

import {
  HomeList,
  HomeListItem,
  HomeListItemIcon,
  HomeListItemText,
  HomeDivider,
  MusicIcon,
  AdminIcon,
  ApproveIcon,
  UpdateIcon
} from '../../style';

import {
  HomeAdminContainer
} from './style';

const HomeAdmin = () => {

  const history = useHistory();

  return (
    <HomeAdminContainer>
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
            <UpdateIcon color='secondary' />
          </HomeListItemIcon>
          <HomeListItemText primary='Tornar um usuário free em um premium' />
        </HomeListItem>
      </HomeList>
    </HomeAdminContainer>
  )
};

export default HomeAdmin;