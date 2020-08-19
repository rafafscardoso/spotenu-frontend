import React from 'react';
import { useContext } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import {} from '../../request';
import {
  PageContainer
} from '../../style';

import {
  AlbumPageContainer
} from './style';

const AlbumPage = () => {

  usePrivatePage();

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