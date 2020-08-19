import React from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import {} from '../../request';
import {
  PageContainer
} from '../../style';

import {
  BandAlbumsPageContainer
} from './style';

const BandAlbumsPage = () => {

  usePrivatePage();

  return (
    <PageContainer>
      <Header />
      <BandAlbumsPageContainer>
        BandAlbumsPage
      </BandAlbumsPageContainer>
      <Footer />
    </PageContainer>
  );
};

export default BandAlbumsPage;