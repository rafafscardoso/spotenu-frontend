import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { usePrivatePage } from '../../hooks';
import { ProfileContext } from '../../contexts';
import {
  PageContainer
} from '../../style';

import {
  ApproveBandPageContainer
} from './style';

const ApproveBandPage = () => {

  const { profile, setProfile } = useContext(ProfileContext);

  usePrivatePage(setProfile);

  return (
    <PageContainer>
      <Header />
      <ApproveBandPageContainer>
        ApproveBandPage
      </ApproveBandPageContainer>
      <Footer />
    </PageContainer>
  );
}

export default ApproveBandPage;