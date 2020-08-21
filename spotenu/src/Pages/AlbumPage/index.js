import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import {} from '../../request';
import {
  PageContainer
} from '../../style';

import {
  AlbumPageContainer
} from './style';

const AlbumPage = () => {

  const { profile, setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  return (
    <PageContainer>
      <Header />
      <AlbumPageContainer>
        AlbumPage
      </AlbumPageContainer>
      <Footer />
    </PageContainer>
  )
};

export default AlbumPage;